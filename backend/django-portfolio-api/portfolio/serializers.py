from rest_framework import serializers
from .models import Project, Skill, Certification, Achievement, Hobby, Education, ContactMethod


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'description', 'long_description',
            'features', 'tech_stack', 'github_url', 'apk_url', 'live_url', 'image',
            'featured', 'order', 'gradient', 'accent_color', 'created_at',
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'category', 'icon', 'color', 'items', 'order']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'year', 'url', 'icon', 'color']


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = [
            'id', 'title', 'platform', 'description', 'year',
            'icon', 'color', 'gradient', 'border_color', 'text_color',
        ]


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id', 'name', 'icon', 'description', 'order']


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'institution', 'degree', 'grade', 'period',
            'location', 'icon', 'color', 'order',
        ]


class ContactMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMethod
        fields = [
            'id', 'label', 'value', 'href', 'icon', 'color',
            'border_color', 'bg', 'hover_bg', 'order',
        ]
