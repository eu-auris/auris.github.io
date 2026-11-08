# Site web AURIS

Site du réseau doctoral **AURIS — Advanced Ultra-precise Robotic Inner-ear Surgery**
(Marie Skłodowska-Curie Actions, Doctoral Network, Horizon Europe).

- Générateur : **Jekyll** (construit nativement par GitHub Pages, sans GitHub Actions)
- Contenu : fichiers **`_data/*.yml`** — aucune modification HTML n'est nécessaire pour mettre à jour le site
- Style : un seul fichier CSS ([assets/css/main.css](assets/css/main.css)), couleurs en variables CSS, modes clair/sombre, responsive
- Aucun cookie, aucun traceur, aucune police ou script externe

Dépôt : `git@github.com:scientific-projects/auris.github.io.git`
URL publique (une fois GitHub Pages activé) : <https://scientific-projects.github.io/auris.github.io/>

---

## 1. Lancer le site en local

Prérequis : Ruby ≥ 3.0 et Bundler. Sur ce Mac, rbenv fournit Ruby 3.2.2.

```bash
./scripts/serve.sh
```

Puis ouvrir <http://127.0.0.1:4000/auris.github.io/>.

Le script règle `PATH`/`RBENV_VERSION`/`LANG`, installe les gems si besoin (`bundle install`) et lance
`bundle exec jekyll serve`. Les pages et les fichiers `_data` sont rechargés automatiquement ;
**`_config.yml` ne l'est pas** (relancer le serveur après l'avoir modifié).

Équivalent manuel :

```bash
export PATH="$HOME/.rbenv/shims:$PATH" RBENV_VERSION=3.2.2 LANG=en_US.UTF-8
bundle install
bundle exec jekyll serve
```

<details>
<summary>Sans rbenv : via pixi (conda-forge)</summary>

```bash
pixi add ruby compilers make
pixi run gem install bundler
pixi run bundle install
pixi run bundle exec jekyll serve
```

</details>

Le [Gemfile](Gemfile) utilise la gem `github-pages`, donc **les mêmes versions que les serveurs de
GitHub** (Jekyll 3.9 et uniquement les plugins autorisés). Ne pas ajouter de plugin hors de
[cette liste](https://pages.github.com/versions/) : il serait ignoré en production.

---

## 2. Modifier le contenu

Tout le contenu factuel est dans [`_data/`](_data/). Toute valeur qui contient **`TODO`** est
affichée sur le site avec un **encadré jaune en pointillés** jusqu'à ce qu'elle soit remplacée —
il suffit de parcourir le site pour voir ce qui manque.

| Fichier | Contenu | Pages |
| --- | --- | --- |
| [`project.yml`](_data/project.yml) | Faits clés : n° de convention, dates, coordinateur, contact, réseaux sociaux | toutes (pied de page) |
| [`navigation.yml`](_data/navigation.yml) | Menu principal | toutes |
| [`objectives.yml`](_data/objectives.yml) | Objectifs | About |
| [`research_areas.yml`](_data/research_areas.yml) | Axes de recherche (avec icône) | Home, About |
| [`work_packages.yml`](_data/work_packages.yml) | Work packages | About |
| [`partners.yml`](_data/partners.yml) | Bénéficiaires et partenaires associés | Home, Consortium |
| [`doctoral_candidates.yml`](_data/doctoral_candidates.yml) | Projets DC (statut, hôte, encadrants, secondments…) | Home, Doctoral Candidates, Vacancies |
| [`events.yml`](_data/events.yml) | Formations et événements | Home, Training & Events |
| [`news.yml`](_data/news.yml) | Actualités | Home, News |
| [`recruitment.yml`](_data/recruitment.yml) | Statut du recrutement, date limite, calendrier | Home, Vacancies |

Conseils :

- **Ajouter un élément** : copier un bloc existant (de `- ` jusqu'au bloc suivant) et l'adapter.
  Respecter l'indentation (2 espaces, jamais de tabulation).
- **Dates** : format `AAAA-MM-JJ`. Un événement sans date (`date: ""`) apparaît en « TBA ».
  Les événements passés/à venir sont triés au moment de la construction (à chaque push).
- **Statut d'un DC** : `upcoming` (bientôt ouvert), `open` (affiché dans Vacancies avec bouton
  « Apply » si `apply_url` est rempli), `recruited` (affiche `candidate` et `photo`), `closed`.
- **Recrutement** : `recruitment.yml → status` vaut `upcoming`, `open` ou `closed` ; il pilote le
  bandeau de la page d'accueil et la page Vacancies.
- **Logos des partenaires** : déposer les fichiers dans `assets/images/partners/` puis renseigner
  `logo: /assets/images/partners/nom.png` (sans le baseurl). Sinon les initiales (`short`) sont affichées.
- **Photos des DC** : `assets/images/dcs/` ; images d'actualités : `assets/images/news/` (renseigner `image_alt`).
- Texte libre : les pages sont dans les fichiers `*.html` à la racine (about, consortium, training, vacancies…).

Pour vérifier qu'il ne reste aucun placeholder :

```bash
grep -rn "TODO" _data *.html
```

---

## 3. Identité visuelle et obligations UE

- Palette tirée du logo : bleu foncé `#2E6DB4` → bleu clair `#A9CBE6` (variables `--brand-*` en
  tête de `main.css`). Le logo d'origine a un fond blanc ; `auris-logo-transparent.png` en est une
  copie détourée utilisée dans l'en-tête et le pied de page.
- **Emblème UE** : `assets/images/eu/funded-by-the-eu-pos.png` provient du
  [centre de téléchargement officiel de la Commission](https://ec.europa.eu/regional_policy/information-sources/logo-download-center_en)
  (archive `funded_en.zip`, version horizontale RGB « POS », redimensionnée à 1000 px).
  Il est toujours posé sur fond blanc (y compris en mode sombre), visible dès l'arrivée sur la
  page d'accueil et répété dans le pied de page avec la mention de financement et la clause de
  non-responsabilité. Ne pas le recolorer, le déformer ni l'afficher plus petit que les logos des partenaires.
  Règles : [Use of the EU emblem](https://commission.europa.eu/funding-tenders/managing-your-project/communicating-and-raising-eu-visibility_en).
- Le numéro de convention de subvention s'affiche automatiquement dès que
  `project.yml → grant_agreement` est rempli.

---

## 4. Mettre en ligne avec GitHub Pages

1. Le dépôt **`scientific-projects/auris.github.io`** existe déjà (vide). S'il est privé, GitHub
   Pages exige un plan payant de l'organisation : le plus simple est de le passer en public.
2. En local (le dépôt est déjà initialisé avec ce remote `origin`) :
   ```bash
   git add .
   git commit -m "feat: initial AURIS website"
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Build and deployment → Source : “Deploy from a branch”**,
   branche **`main`**, dossier **`/ (root)`**, puis **Save**.
4. Après 1–2 minutes, le site est en ligne sur
   `https://scientific-projects.github.io/auris.github.io/`.

> ⚠️ **Nom du dépôt.** Seul un dépôt nommé exactement `scientific-projects.github.io` est servi à la
> racine `https://scientific-projects.github.io/`. Le dépôt `auris.github.io` est un *site de projet*,
> servi sous le chemin `/auris.github.io/` — c'est pourquoi `_config.yml` contient
> `baseurl: "/auris.github.io"`. Si vous renommez le dépôt (par ex. `auris`), mettez `baseurl` à jour.

### Domaine personnalisé (plus tard)

1. Créer à la racine un fichier `CNAME` contenant uniquement le domaine (par ex. `auris-dn.eu`).
2. Dans `_config.yml` : `url: "https://auris-dn.eu"` et `baseurl: ""`.
3. Chez le registraire DNS : pour un domaine racine, des enregistrements `A` vers
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ; pour un sous-domaine
   (`www`), un `CNAME` vers `scientific-projects.github.io`.
4. **Settings → Pages → Custom domain**, puis cocher **Enforce HTTPS** quand le certificat est prêt.
   Il est recommandé de [vérifier le domaine](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) au niveau de l'organisation.

---

## 5. Structure

```
_config.yml            configuration Jekyll (url, baseurl, plugins)
_data/                 contenu éditable (YAML)
_includes/             fragments : en-tête, pied de page, bloc UE, cartes DC/partenaires/événements, icônes
_layouts/              default.html (squelette), page.html (pages intérieures)
assets/css/main.css    styles (variables, clair/sombre, responsive)
assets/js/             theme-init.js (thème avant affichage), main.js (menu mobile, bascule de thème)
assets/images/         logo, favicons, emblème UE, logos des partenaires
assets/media/          vidéo ROBOCOP du bandeau d'accueil (+ image d'aperçu)
*.html                 pages : index, about, consortium, doctoral-candidates, training, news, vacancies, contact, privacy, 404
scripts/serve.sh       serveur local
```

Accessibilité : lien d'évitement, repères ARIA, `aria-current` dans le menu, focus visible,
contrastes AA en clair et en sombre, respect de `prefers-reduced-motion`. Vérifié avec axe-core
(0 violation WCAG 2 A/AA sur toutes les pages, dans les deux thèmes).
