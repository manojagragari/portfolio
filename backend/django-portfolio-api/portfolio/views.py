from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Project, Skill, Certification, Achievement, Hobby, Education, ContactMethod, Profile
from .serializers import (
    ProjectSerializer, SkillSerializer,
    CertificationSerializer, AchievementSerializer, HobbySerializer,
    EducationSerializer, ContactMethodSerializer, ProfileSerializer,
)


@api_view(['GET'])
def api_root(request):
    return Response({
        'projects': request.build_absolute_uri('/api/projects/'),
        'skills': request.build_absolute_uri('/api/skills/'),
        'certifications': request.build_absolute_uri('/api/certifications/'),
        'achievements': request.build_absolute_uri('/api/achievements/'),
        'hobbies': request.build_absolute_uri('/api/hobbies/'),
        'education': request.build_absolute_uri('/api/education/'),
        'contact': request.build_absolute_uri('/api/contact/'),
        'profile': request.build_absolute_uri('/api/profile/'),
    })


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        if category:
            queryset = queryset.filter(category=category)
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == 'true')
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class AchievementListView(generics.ListAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer


class HobbyListView(generics.ListAPIView):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer


class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ContactMethodListView(generics.ListAPIView):
    queryset = ContactMethod.objects.all()
    serializer_class = ContactMethodSerializer


class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(id=1)
        return profile
