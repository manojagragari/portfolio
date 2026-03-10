from django.contrib import admin
from .models import Project, Skill, Certification, Achievement, Hobby, Education, ContactMethod


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order', 'created_at')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'description')
    list_editable = ('featured', 'order')
    ordering = ('order',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('category', 'color', 'order')
    list_editable = ('order',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'year')
    list_filter = ('issuer', 'year')
    search_fields = ('title',)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'platform', 'year')
    list_filter = ('year',)
    search_fields = ('title',)


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
