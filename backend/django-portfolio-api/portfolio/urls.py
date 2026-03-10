from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('skills/', views.SkillListView.as_view(), name='skill-list'),
    path('certifications/', views.CertificationListView.as_view(), name='certification-list'),
    path('achievements/', views.AchievementListView.as_view(), name='achievement-list'),
]
