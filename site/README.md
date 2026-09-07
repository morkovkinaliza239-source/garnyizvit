# Гарний Звіт — сайт бухгалтерських послуг для ФОП

Astro (статичний сайт) + блог у Markdown + редактор у браузері. Хостинг — Cloudflare Pages, домен garnyizvit.com.ua.

## 1. Локальний запуск

```
cd site
npm install
npm run dev
```
Відкрити http://localhost:4321

## 1.5. Обов'язково: перейменувати один файл

`site/src/pages/blog/-slug-.astro` → `site/src/pages/blog/[slug].astro`
(квадратні дужки в назві — це динамічний маршрут статті; тут файл збережено без них). Без цього сторінки статей не будуть генеруватись.

## 2. GitHub

Створіть репозиторій (напр. `garnyizvit`), завантажте цю папку:
```
git init
git add .
git commit -m "site"
git branch -M main
git remote add origin https://github.com/ВАШ_НІК/garnyizvit.git
git push -u origin main
```

## 3. Cloudflare Pages

Dashboard → Workers & Pages → Create → Pages → Connect to Git → вибрати репозиторій.
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `site` (якщо репозиторій містить цю папку всередині)

Далі Custom domains → Set up a domain → `garnyizvit.com.ua` (домен має бути доданий у Cloudflare, NS-записи змінені у реєстратора).

Кожен `git push` = автоматична публікація за ~40 секунд.

## 4. Як писати статті

**Варіант А — редактор у браузері (щоденний блог).**
Відкрийте `https://garnyizvit.com.ua/admin/`, увійдіть через GitHub. Заголовок → опис → текст → Publish. Стаття комітиться в репозиторій, Cloudflare публікує сайт сам. Працює і з телефона.
Перед першим використанням у `site/public/admin/config.yml` замініть `ВАШ_НІК/garnyizvit` на свій репозиторій.

**Варіант Б — файлом.**
Створіть `site/src/content/blog/nazva-statti.md`:
```markdown
---
title: "Заголовок"
description: "Один рядок опису"
date: 2026-09-08
tag: "Податки"
---

Текст статті у Markdown. ## Підзаголовок, **жирний**, списки.
```
Стаття автоматично з'явиться у /blog/, у sitemap і в RSS.

## 5. Форма заявки

У `src/pages/kontakty.astro` форма надсилається на Formspree. Зареєструйтесь на formspree.io, створіть форму і замініть `ВАШ_ID` у атрибуті `action`.

## Що ще замінити

- Фото: заглушки на головній та у «Про мене» (`.plate`) — замініть на `<img>` у тому ж контейнері.
- Відгуки на головній — реальні імена та тексти.
- E-mail `info@garnyizvit.com.ua` — створіть скриньку або поставте наявну.
