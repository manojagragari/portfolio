from django.db import models


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

    def __str__(self):
        return f"[{self.category}] {self.title}"


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

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f"{self.title} – {self.issuer}"


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

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return self.title


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
