from django.db import models
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from PIL import Image as PilImage
import io
import os
from django.core.files.base import ContentFile


def _optimize_image(image_field, max_width=1600, quality=80):
    """Convert uploads to WebP and resize large images. Returns True if field changed."""
    if not image_field:
        return False
    try:
        name, ext = os.path.splitext(image_field.name)
        img = PilImage.open(image_field)
        should_resize = img.width > max_width
        is_webp = ext.lower() == '.webp'

        # Fast path: already webp and no resize needed.
        if is_webp and not should_resize:
            return False

        img = img.convert('RGB')
        if should_resize:
            ratio = max_width / float(img.width)
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), PilImage.Resampling.LANCZOS)

        buffer = io.BytesIO()
        img.save(buffer, format='WEBP', quality=quality, method=6, optimize=True)
        buffer.seek(0)
        new_name = os.path.basename(name) + '.webp'
        image_field.save(new_name, ContentFile(buffer.read()), save=False)
        return True
    except Exception:
        return False


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Development'),
        ('android', 'Android Development'),
        ('data_science', 'Data Science'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    features = models.JSONField(default=list)
    tech_stack = models.JSONField(default=list)
    github_url = models.URLField(blank=True, null=True)
    apk_url = models.CharField(max_length=300, blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    gradient = models.CharField(max_length=100, default='from-cyan-500/20 to-blue-500/20')
    accent_color = models.CharField(max_length=30, default='cyan')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        constraints = [
            models.UniqueConstraint(fields=['category', 'title'], name='uniq_project_category_title'),
        ]

    def __str__(self):
        return f"[{self.category}] {self.title}"

    def save(self, *args, **kwargs):
        optimize_images = kwargs.pop('optimize_images', True)
        super().save(*args, **kwargs)
        if optimize_images and _optimize_image(self.image, max_width=1600):
            super().save(update_fields=['image'])


@receiver(pre_save, sender=Project)
def clean_project_image(sender, instance, **kwargs):
    """Delete old image file if it's been replaced or cleared."""
    if instance.pk:
        old_instance = Project.objects.get(pk=instance.pk)
        if old_instance.image and old_instance.image != instance.image:
            _delete_image_file(old_instance.image)


@receiver(post_delete, sender=Project)
def delete_project_image(sender, instance, **kwargs):
    """Delete image file when project is deleted."""
    if instance.image:
        _delete_image_file(instance.image)


class ProjectGalleryImage(models.Model):
    project = models.ForeignKey(Project, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Gallery image for {self.project.title}"

    def save(self, *args, **kwargs):
        optimize_images = kwargs.pop('optimize_images', True)
        super().save(*args, **kwargs)
        if optimize_images and _optimize_image(self.image, max_width=1400):
            super().save(update_fields=['image'])


@receiver(pre_save, sender=ProjectGalleryImage)
def clean_gallery_image(sender, instance, **kwargs):
    """Delete old image file if it's been replaced."""
    if instance.pk:
        old_instance = ProjectGalleryImage.objects.get(pk=instance.pk)
        if old_instance.image and old_instance.image != instance.image:
            _delete_image_file(old_instance.image)


@receiver(post_delete, sender=ProjectGalleryImage)
def delete_gallery_image(sender, instance, **kwargs):
    """Delete image file when gallery image is deleted."""
    if instance.image:
        _delete_image_file(instance.image)


class Skill(models.Model):
    COLOR_CHOICES = [
        ('cyan', 'Cyan'),
        ('purple', 'Purple'),
        ('blue', 'Blue'),
        ('green', 'Green'),
    ]

    category = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, default='💻')
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='cyan')
    items = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.category


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    url = models.URLField(blank=True, null=True)
    icon = models.CharField(max_length=10, default='📜')
    color = models.CharField(max_length=20, default='cyan')
    cover_image = models.ImageField(upload_to='certifications/covers/', blank=True, null=True)
    cert_image = models.ImageField(upload_to='certifications/docs/', blank=True, null=True)

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f"{self.title} – {self.issuer}"

    def save(self, *args, **kwargs):
        optimize_images = kwargs.pop('optimize_images', True)
        super().save(*args, **kwargs)
        if not optimize_images:
            return
        updated_fields = []
        if _optimize_image(self.cover_image, max_width=1400):
            updated_fields.append('cover_image')
        if _optimize_image(self.cert_image, max_width=1800):
            updated_fields.append('cert_image')
        if updated_fields:
            super().save(update_fields=updated_fields)


# Helper function to delete image files
def _delete_image_file(image_field):
    """Delete image file from storage if it exists."""
    if image_field and image_field.name:
        if os.path.isfile(image_field.path):
            os.remove(image_field.path)


# Signals for automatic image cleanup
@receiver(pre_save, sender=Certification)
def clean_certification_images(sender, instance, **kwargs):
    """Delete old image files if they've been replaced or cleared."""
    if instance.pk:
        old_instance = Certification.objects.get(pk=instance.pk)
        # If cover_image was removed, delete the file
        if old_instance.cover_image and old_instance.cover_image != instance.cover_image:
            _delete_image_file(old_instance.cover_image)
        # If cert_image was removed, delete the file
        if old_instance.cert_image and old_instance.cert_image != instance.cert_image:
            _delete_image_file(old_instance.cert_image)


@receiver(post_delete, sender=Certification)
def delete_certification_images(sender, instance, **kwargs):
    """Delete image files when certification is deleted."""
    if instance.cover_image:
        _delete_image_file(instance.cover_image)
    if instance.cert_image:
        _delete_image_file(instance.cert_image)


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    platform = models.CharField(max_length=100)
    description = models.TextField()
    year = models.PositiveIntegerField()
    icon = models.CharField(max_length=10, default='⭐')
    color = models.CharField(max_length=20, default='cyan')
    gradient = models.CharField(max_length=100, default='from-cyan-500/10 to-transparent')
    border_color = models.CharField(max_length=100, default='border-cyan-500/30')
    text_color = models.CharField(max_length=50, default='text-cyan-400')
    cover_image = models.ImageField(upload_to='achievements/covers/', blank=True, null=True)
    reference_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        optimize_images = kwargs.pop('optimize_images', True)
        super().save(*args, **kwargs)
        if optimize_images and _optimize_image(self.cover_image, max_width=1400):
            super().save(update_fields=['cover_image'])


@receiver(pre_save, sender=Achievement)
def clean_achievement_image(sender, instance, **kwargs):
    """Delete old image file if it's been replaced or cleared."""
    if instance.pk:
        old_instance = Achievement.objects.get(pk=instance.pk)
        if old_instance.cover_image and old_instance.cover_image != instance.cover_image:
            _delete_image_file(old_instance.cover_image)


@receiver(post_delete, sender=Achievement)
def delete_achievement_image(sender, instance, **kwargs):
    """Delete image file when achievement is deleted."""
    if instance.cover_image:
        _delete_image_file(instance.cover_image)


class Hobby(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, default='🎯')
    description = models.CharField(max_length=250)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    grade = models.CharField(max_length=100)
    period = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    icon = models.CharField(max_length=10, default='🎓')
    color = models.CharField(max_length=20, default='cyan')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.institution


class Profile(models.Model):
    """Singleton-style model — only one row should exist (id=1)."""
    name = models.CharField(max_length=100, default='Manoj Agrahari')
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    cover_banner = models.ImageField(upload_to='profile/banners/', blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    resume_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        optimize_images = kwargs.pop('optimize_images', True)
        super().save(*args, **kwargs)
        if not optimize_images:
            return
        updated_fields = []
        if _optimize_image(self.profile_image, max_width=1000):
            updated_fields.append('profile_image')
        if _optimize_image(self.cover_banner, max_width=2000):
            updated_fields.append('cover_banner')
        if updated_fields:
            super().save(update_fields=updated_fields)


@receiver(pre_save, sender=Profile)
def clean_profile_images(sender, instance, **kwargs):
    """Delete old image files if they've been replaced or cleared."""
    if instance.pk:
        old_instance = Profile.objects.get(pk=instance.pk)
        if old_instance.profile_image and old_instance.profile_image != instance.profile_image:
            _delete_image_file(old_instance.profile_image)
        if old_instance.cover_banner and old_instance.cover_banner != instance.cover_banner:
            _delete_image_file(old_instance.cover_banner)


@receiver(post_delete, sender=Profile)
def delete_profile_images(sender, instance, **kwargs):
    """Delete image files when profile is deleted."""
    if instance.profile_image:
        _delete_image_file(instance.profile_image)
    if instance.cover_banner:
        _delete_image_file(instance.cover_banner)


class ContactMethod(models.Model):
    label = models.CharField(max_length=50)
    value = models.CharField(max_length=200)
    href = models.CharField(max_length=300)
    icon = models.CharField(max_length=20)
    color = models.CharField(max_length=50, default='text-cyan-400')
    border_color = models.CharField(max_length=100, default='border-cyan-500/30')
    bg = models.CharField(max_length=100, default='bg-cyan-500/10')
    hover_bg = models.CharField(max_length=100, default='hover:bg-cyan-500/20')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label
