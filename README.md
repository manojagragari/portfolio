# Manoj Agrahari – Full-Stack Developer Portfolio

A modern, full-stack developer portfolio featuring a **Next.js frontend** with Framer Motion animations and a **Django REST API backend**. Built with a dark futuristic cyber theme.

## ✨ Features

- **Full-Stack Architecture**: Next.js + React frontend, Django REST Framework backend
- **Cyber Theme Design**: Dark (#0a0a0a) with cyan/purple/blue accent colors
- **Modern Animations**: Framer Motion transitions, scroll-triggered reveals
- **Responsive**: Mobile-first design with Tailwind CSS
- **Project Showcase**: Web, Android, and Data Science project categories
- **Interactive Components**: Typing animation, orbit rings, glassmorphism cards
- **Loading Screen**: Cyberpunk loading animation on first visit
- **Scroll Progress**: Visual scroll progress indicator
- **SEO Optimized**: Metadata and semantic HTML
- **Fallback Data**: Works without backend using static data
- **Admin Panel**: Django admin for managing portfolio content
- **Deployment Ready**: Configured for Render.com hosting

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Fonts**: Google Fonts (Orbitron, Inter)

### Backend
- **Framework**: Django 4.2
- **API**: Django REST Framework
- **CORS**: django-cors-headers
- **Static Files**: WhiteNoise
- **Server**: Gunicorn
- **Database**: SQLite (dev), PostgreSQL (production)
- **Image Processing**: Pillow

## 📁 Project Structure

```
portfolio2/
├── frontend/nextjs-portfolio/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── page.js            # Home page
│   │   └── [category]-projects/page.js  # Project detail pages
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── LoadingScreen.js
│   │   └── ScrollProgress.js
│   ├── sections/              # 11 portfolio sections
│   │   ├── Hero.js
│   │   ├── Education.js
│   │   ├── WebDevelopment.js
│   │   ├── DataScience.js
│   │   ├── AndroidDevelopment.js
│   │   ├── Skills.js
│   │   ├── Achievements.js
│   │   ├── Certifications.js
│   │   ├── Hobbies.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── lib/
│   │   ├── api.js             # API functions
│   │   └── data.js            # Static fallback data
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.local
│
├── backend/django-portfolio-api/
│   ├── portfolio_api/         # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── portfolio/             # Django app
│   │   ├── models.py          # Project, Skill, Certification, Achievement
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # DRF serializers
│   │   ├── admin.py           # Admin configuration
│   │   ├── urls.py
│   │   └── fixtures/initial_data.json
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile               # For Render deployment
│   ├── build.sh               # Build script
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **pip** and **npm** package managers

### Frontend Installation

```bash
cd frontend/nextjs-portfolio

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Backend Installation

```bash
cd backend/django-portfolio-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your SECRET_KEY and settings

# Run migrations
python manage.py migrate

# Load initial data
python manage.py loaddata portfolio/fixtures/initial_data.json

# Create superuser (for admin panel)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

API available at `http://localhost:8000/api/`
Admin panel at `http://localhost:8000/admin/`

## 📚 API Endpoints

### Projects
- `GET /api/projects/` – List all projects
- `GET /api/projects/?category=web` – Filter by category
- `GET /api/projects/<id>/` – Get project details

### Skills
- `GET /api/skills/` – List all skill categories

### Certifications
- `GET /api/certifications/` – List all certifications

### Achievements
- `GET /api/achievements/` – List all achievements

## 🎨 Customization

### Colors & Theme
Edit `frontend/nextjs-portfolio/tailwind.config.js` to change colors:
```js
colors: {
  cyber: {
    bg: '#0a0a0a',      // Background
    cyan: '#00e5ff',    // Primary accent
    purple: '#a855f7',  // Secondary accent
    blue: '#3b82f6',    // Tertiary accent
  }
}
```

### Portfolio Content
#### Via Admin Panel
1. Navigate to `http://localhost:8000/admin/`
2. Login with superuser credentials
3. Add/edit Projects, Skills, Certifications, Achievements

#### Via Django Shell
```bash
python manage.py shell
from portfolio.models import Project
Project.objects.create(
    title="Your Project",
    category="web",
    description="...",
    tech_stack=["React", "Django"],
    featured=True
)
```

### Fonts
Change fonts in `frontend/nextjs-portfolio/app/layout.js` by modifying the imports:
```js
import { YourFont } from 'next/font/google';
```

## 🌐 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost 127.0.0.1
DATABASE_URL=  # Leave empty for SQLite
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Contact form email delivery
CONTACT_RECEIVER_EMAIL=your-email@example.com
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@example.com

# Optional contact endpoint throttle
CONTACT_SUBMIT_RATE=3/hour
```

## 🚢 Deployment

### Frontend (Vercel - Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import project in Vercel**
   - Create project from your GitHub repository
   - Framework preset: `Next.js`
   - Root Directory: `frontend/nextjs-portfolio`
   - Build command: `npm run build`
   - Output Directory: leave empty (use Vercel default)

3. **Set environment variables in Vercel**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain
   ```

4. **Deploy**
   - Vercel will generate a production URL like `https://your-app.vercel.app`
   - Add your custom domain in Vercel Project Settings (optional)

### Backend (Render.com - Recommended for Django)

Vercel is great for the Next.js frontend, but this Django setup is better on Render because it needs database migrations and a persistent database.

### Backend (Render.com)

1. **Create PostgreSQL Database on Render**
   - Copy the `DATABASE_URL`

2. **Create New Web Service**
   - Repository: Your GitHub repository URL
   - Branch: `main`
   - Root Directory: `backend/django-portfolio-api`
   - Build command: `bash build.sh`
   - Start command: `gunicorn portfolio_api.wsgi:application`
   - Environment variables:
     ```
     SECRET_KEY=your-production-secret-key
     DEBUG=False
     ALLOWED_HOSTS=your-backend.onrender.com
     DATABASE_URL=postgres://...  # From PostgreSQL service
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app https://your-custom-domain.com
   CORS_ALLOWED_ORIGIN_REGEXES=^https://.*\.vercel\.app$
     ```

3. **Run migrations on production**
   ```bash
   python manage.py migrate --noinput
   ```

## 🔐 Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Generate a strong `SECRET_KEY`
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Enable HTTPS
- [ ] Set `SECURE_SSL_REDIRECT=True` in production
- [ ] Update CORS origins to your frontend URL
- [ ] Change default admin path in production settings

## 📝 Building from Fixture Data

To reload initial data:
```bash
python manage.py loaddata portfolio/fixtures/initial_data.json
```

To create custom fixture:
```bash
python manage.py dumpdata portfolio > backup.json
```

## 🐛 Troubleshooting

### Frontend not connecting to API
- Ensure backend is running on configured port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in `portfolio_api/settings.py`

### Database migration errors
```bash
python manage.py makemigrations
python manage.py migrate --fake-initial  # If needed
```

### Static files not loading in production
```bash
python manage.py collectstatic --no-input
```

### Port already in use
```bash
# Frontend
npm run dev -- -p 3001

# Backend
python manage.py runserver 0.0.0.0:8001
```

## 📱 Responsive Design

- Mobile: 320px – 640px
- Tablet: 640px – 1024px
- Desktop: 1024px+

All sections are fully responsive and touch-friendly.

## ♿ Accessibility

- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## 🎯 Performance

- **Frontend**: Next.js Image optimization, Code splitting
- **Backend**: Database indexing, Query optimization
- **Assets**: WhiteNoise compression, Lazy loading

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Manoj Agrahari**
- GitHub: [@manojagragari](https://github.com/manojagragari)
- LinkedIn: [Manoj Agrahari](https://www.linkedin.com/in/manojagrahari)
- Email: manojagrahari7521@gmail.com

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Email manojagrahari7521@gmail.com
- DM on LinkedIn

---

**Built with ❤️ using modern web technologies**
