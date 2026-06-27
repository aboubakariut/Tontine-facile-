# Tontine Facile

## Description
Tontine Facile est une application web pour gérer les tontines (Adachi, njangi) en toute transparence.

## Stack
- **Frontend**: Next.js 14 + React 18
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel

## Installation

```bash
git clone https://github.com/aboubakariut/Tontine-facile-.git
cd Tontine-facile-
npm install
cp .env.local.example .env.local
# Remplir les variables Supabase
npm run dev
```

## Configuration Supabase

1. Aller sur https://supabase.com
2. Créer un projet
3. Exécuter le contenu de `supabase.sql` dans l'SQL Editor
4. Copier les clés API dans `.env.local`

## Déploiement Vercel

```bash
git push origin main
```

Sur vercel.com, importer le repo et ajouter les variables d'env.

## Fonctionnalités

✅ Authentification
✅ Créer une tontine
✅ Cotiser
✅ Voir l'historique
✅ Gestion des membres
✅ Realtime updates

## License
MIT
