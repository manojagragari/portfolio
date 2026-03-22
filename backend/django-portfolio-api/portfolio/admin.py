from django.contrib import admin
from django.utils.html import format_html
from .models import Project, ProjectGalleryImage, Skill, Certification, Achievement, Hobby, Education, ContactMethod, Profile


class ProjectGalleryInline(admin.TabularInline):
    model = ProjectGalleryImage
    extra = 1
    fields = ('image', 'caption', 'order', 'image_preview')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Preview'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order', 'created_at')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'description')
    list_editable = ('featured', 'order')
    ordering = ('order',)
    inlines = [ProjectGalleryInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('category', 'color', 'order')
    list_editable = ('order',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title_with_year', 'issuer', 'image_status')
    list_filter = ('issuer', 'year')
    search_fields = ('title',)
    fields = ('title', 'issuer', 'year', 'url', 'icon', 'color', 
              'cover_image', 'cover_image_preview', 'cert_image', 'cert_image_preview')
    readonly_fields = ('cover_image_preview', 'cert_image_preview')
    
    def title_with_year(self, obj):
        return f"{obj.title} ({obj.year})"
    title_with_year.short_description = 'Title'
    
    def image_status(self, obj):
        status = []
        if obj.cover_image:
            status.append('✓ Cover')
        if obj.cert_image:
            status.append('✓ Cert')
        return ' | '.join(status) if status else '—'
    image_status.short_description = 'Images'
    
    def cover_image_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 200px; border-radius: 4px;" />',
                obj.cover_image.url
            )
        return 'No image uploaded'
    cover_image_preview.short_description = 'Cover Image Preview'
    
    def cert_image_preview(self, obj):
        if obj.cert_image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 200px; border-radius: 4px;" />',
                obj.cert_image.url
            )
        return 'No image uploaded'
    cert_image_preview.short_description = 'Certificate Image Preview'


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'platform', 'year', 'has_image')
    list_filter = ('year',)
    search_fields = ('title',)
    fields = ('title', 'platform', 'description', 'year', 'icon', 'color', 
              'gradient', 'border_color', 'text_color', 'cover_image', 'image_preview', 'reference_url')
    readonly_fields = ('image_preview',)
    
    def has_image(self, obj):
        if obj.cover_image:
            return '✓ Yes'
        return '✗ No'
    has_image.short_description = 'Has Image'
    
    def image_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 200px; border-radius: 4px;" />',
                obj.cover_image.url
            )
        return 'No image uploaded'
    image_preview.short_description = 'Image Preview'


@admin.register(Hobby)
class HobbyAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'description')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('institution', 'degree', 'grade', 'period', 'order')
    list_editable = ('order',)
    search_fields = ('institution', 'degree', 'location')


@admin.register(ContactMethod)
class ContactMethodAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'href', 'order')
    list_editable = ('order',)
    search_fields = ('label', 'value', 'href')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'has_images')
    fields = ('name', 'bio', 'email', 'phone', 'github_url', 'linkedin_url', 'instagram_url', 'resume_url',
              'profile_image', 'profile_preview', 'cover_banner', 'banner_preview')
    readonly_fields = ('profile_preview', 'banner_preview')
    
    def has_images(self, obj):
        images = []
        if obj.profile_image:
            images.append('Profile')
        if obj.cover_banner:
            images.append('Banner')
        return ' + '.join(images) if images else '—'
    has_images.short_description = 'Images'
    
    def profile_preview(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 50%; border: 3px solid #ccc;" />',
                obj.profile_image.url
            )
        return 'No image uploaded'
    profile_preview.short_description = 'Profile Image Preview'
    
    def banner_preview(self, obj):
        if obj.cover_banner:
            return format_html(
                '<img src="{}" style="max-width: 100%; max-height: 200px; border-radius: 4px;" />',
                obj.cover_banner.url
            )
        return 'No image uploaded'
    banner_preview.short_description = 'Cover Banner Preview'
