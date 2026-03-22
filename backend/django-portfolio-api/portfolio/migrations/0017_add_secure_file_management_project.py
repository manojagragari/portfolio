from django.db import migrations


def add_secure_file_management_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.get_or_create(
        title='Secure File Management System (CSE316)',
        category='data_science',
        defaults={
            'description': 'An OS-concepts based secure file management system to store, organize, search, track, and manage digital documents with role-based access, version tracking, and structured workflow support.',
            'long_description': 'This CSE316 academic project applies core Operating System concepts to design and implement a secure file management platform for business use cases. The system supports structured storage and lifecycle management for text documents, images, videos, contracts, and other digital assets. It focuses on secure access control, file organization, retrieval efficiency, auditability, and controlled collaboration. The project demonstrates practical understanding of OS-level concepts such as process flow design, memory-efficient operations, file handling, access permissions, and reliability through backup and recovery-aware design.',
            'features': [
                'Secure upload, download, edit, delete, and file tracking workflows',
                'Folder hierarchy and metadata-based file organization',
                'Fast locate and search for documents across categories',
                'Role-based access control and permission management',
                'Version-aware file handling for safer collaboration',
                'Audit-friendly activity tracking and file lifecycle visibility',
                'Support for multiple file types including documents, images, videos, and contracts',
                'Backup and recovery-oriented design for data reliability',
                'Business-oriented workflow for document management and retrieval',
            ],
            'tech_stack': [
                'Python',
                'Operating System Concepts',
                'File Handling',
                'Access Control',
                'Data Structures',
                'SQL',
                'UI/UX',
            ],
            'github_url': 'https://github.com/manojagragari',
            'featured': True,
            'order': 4,
            'gradient': 'from-slate-500/20 to-zinc-500/20',
            'accent_color': 'slate',
        },
    )


def remove_secure_file_management_project(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Project.objects.filter(
        title='Secure File Management System (CSE316)',
        category='data_science',
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0016_add_tourism_projects'),
    ]

    operations = [
        migrations.RunPython(
            add_secure_file_management_project,
            remove_secure_file_management_project,
        ),
    ]
