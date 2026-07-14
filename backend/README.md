# Muhammet Şahin Yıldırım — Portfolio

Modern, responsive ve açık renkli bir kullanıcı arayüzüne sahip kişisel portfolyo projesi.

Bu proje; backend geliştirme, ürün yönetimi, projeler, teknik yetkinlikler, blog yazıları ve iletişim bölümlerini tek sayfalık bir yapı içinde sunar.

## Özellikler

- Terminal tabanlı açılış ekranı
- Framer Motion ile geçiş animasyonları
- Sabit ve ikon tabanlı navbar
- Home, About, Projects, Skills, Blog ve Contact bölümleri
- Responsive tasarım
- Glassmorphism kart yapıları
- Proje kartlarında proje görseli, kısa açıklama, kullanılan teknolojiler, Live ve GitHub bağlantıları
- Blog kartlarında kapak görseli, kategori, tarih, okuma süresi ve yazı bağlantısı
- İletişim formu
- Mobil ve masaüstü uyumluluğu

## Kullanılan Teknolojiler

- React
- Vite
- JavaScript
- CSS
- Framer Motion
- Lucide React
- Tailwind CSS

## Proje Yapısı

```text
src/
├── assets/
├── components/
│   ├── About.jsx
│   ├── Blogs.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── Navbar.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   └── TerminalIntro.jsx
├── data/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Kurulum

Projeyi bilgisayarına klonla:

```bash
git clone REPOSITORY_URL
```

Proje klasörüne gir:

```bash
cd my-portfolio
```

Bağımlılıkları yükle:

```bash
npm install
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Tarayıcıda Vite tarafından verilen yerel adresi aç:

```text
http://localhost:5173
```

## Production Build

Production çıktısı oluşturmak için:

```bash
npm run build
```

Build çıktısını yerel olarak önizlemek için:

```bash
npm run preview
```

## İçerikleri Özelleştirme

Kişisel bilgilerini aşağıdaki componentlerden güncelleyebilirsin:

- `src/components/Home.jsx`
- `src/components/About.jsx`
- `src/components/Projects.jsx`
- `src/components/Skills.jsx`
- `src/components/Blogs.jsx`
- `src/components/Contact.jsx`

Proje ve blog görsellerini `public` klasörü altında tutabilirsin:

```text
public/
├── projects/
└── blogs/
```

Örnek:

```text
public/projects/task-management.jpg
public/blogs/spring-boot-api.jpg
```

## CV Dosyası

CV indirme butonunun çalışması için CV dosyanı aşağıdaki konuma ekle:

```text
public/resume.pdf
```

## GitHub'a Gönderme

Remote repository tanımlı değilse:

```bash
git remote add origin REPOSITORY_URL
```

Branch adını kontrol et:

```bash
git branch
```

Branch adı `main` ise:

```bash
git push -u origin main
```

Branch adı `master` ise:

```bash
git push -u origin master
```

## Satır Sonu Uyarıları

Windows ortamında aşağıdaki uyarıyı görebilirsin:

```text
LF will be replaced by CRLF
```

Bu bir hata değildir. Satır sonlarını proje genelinde sabitlemek için kök dizine `.gitattributes` dosyası ekleyebilirsin:

```gitattributes
* text=auto

*.js text eol=lf
*.jsx text eol=lf
*.css text eol=lf
*.html text eol=lf
*.json text eol=lf
*.svg text eol=lf
```

Ardından dosyaları normalize et:

```bash
git add --renormalize .
git commit -m "Normalize line endings"
```

## İletişim

**Muhammet Şahin Yıldırım**

- Backend Developer
- Product Owner
- Öğrenci
- LinkedIn: `https://www.linkedin.com/in/muhammetsahinyildirim/`

## Lisans

Bu proje kişisel portfolyo amacıyla hazırlanmıştır.
