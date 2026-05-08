🏋️ # FitTubii-app | Full-Stack Fitness Management System

FitTubii, spor yönetimi süreçlerini dijitalleştirmek için geliştirilmiş, yüksek performanslı ve hiyerarşik yapıya sahip bir fitness platformudur. Proje, kullanıcıların antrenman süreçlerini koç denetimiyle veya bireysel olarak yönetebileceği modüler bir mimari sunar.

🛠️ Sistem Fonksiyonları ve Rol Yönetimi
Sistem, üç farklı yetki seviyesi üzerinden dinamik bir iş akışı sağlar:

🛡️ Admin Paneli: Tüm kullanıcıları listeler ve sistemdeki egzersiz kütüphanesini (ekleme, düzenleme, silme) kontrol eder.

📋 Koç (Trainer) Modülü: Kendisine bağlı sporculara özel antrenman programları atar ve sporcuların tamamladığı çalışmaları denetleyerek gelişim takibi yapar.

💪 Sporcu (User) Modülü: Koç tarafından atanan programları uygular veya kendi tercihine göre serbest antrenman kayıtları oluşturabilir.

⚙️# Teknik Stack
Backend (sporbackend)
Framework: NestJS (v11)

Veritabanı & ORM: PostgreSQL & TypeORM

Güvenlik: JWT tabanlı Passport stratejileri

Dil: TypeScript

Frontend (sporfrontend)
Framework: React (v19) & Vite

Styling: Tailwind CSS (v4)

Navigation: React Router Dom (v7)

HTTP Client: Axios

Notifications: React Hot Toast

## 🚀 Kurulum ve Yerel Çalıştırma

Projeyi yerel ortamınızda çalıştırabilmek için bilgisayarınızda **Node.js** ve **PostgreSQL** kurulu olmalıdır.

### 1. Depoyu Klonlayın
```bash
git clone [https://github.com/tugbasaridas/FitTubii-app.git](https://github.com/tugbasaridas/FitTubii-app.git)
cd FitTubii-app

2. Backend Hazırlığı
Backend dizinine giderek bağımlılıkları yükleyin ve veritabanı konfigürasyonunu ( .env dosyası üzerinden) tamamlayın:
cd sporbackend
npm install
npm run start:dev

3. Frontend Hazırlığı
Yeni bir terminal penceresi açın, frontend dizinine geçin ve istemciyi başlatın:
cd sporfrontend
npm install
npm run dev
Uygulama varsayılan olarak http://localhost:5173 adresinde yayına girecektir
