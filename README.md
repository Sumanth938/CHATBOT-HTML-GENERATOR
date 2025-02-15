# NextAuth Project – README

## 📌 Prerequisites
- Node.js (v18 or higher)
- PostgreSQL Database (e.g., Neon, Railway, or Supabase)
- Vercel CLI (if deploying via terminal)

## 🚀 Installation and Setup
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/Sumanth938/CHATBOT-HTML-GENERATOR.git
   cd CHATBOT-HTML-GENERATOR
   ```

2. **Install dependencies:**  
   ```bash
   npm install
   ```

3. **Configure environment variables:** Create a `.env` file and add the following:
   ```env
   DATABASE_URL="your_postgresql_database_url"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_generated_secret"
   ```
   - To generate a secure secret:
     ```bash
     openssl rand -base64 32
     ```
     or 

     Run this command in PowerShell:
     [System.Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))

4. **Run database migrations:**  
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init

   ```

5. **Start the development server:**  
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

## 🚀 Deploying on Vercel
1. **Push to GitHub:**  
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. **Deploy with Vercel:**  
   - Connect your GitHub repository to Vercel.
   - Set environment variables under Vercel project settings.
   - Deploy the project.

## 🛠️ Troubleshooting
- Ensure `NEXTAUTH_SECRET` is set on Vercel.
- Verify `DATABASE_URL` is correct and publicly accessible.
- Check logs on Vercel Dashboard for errors.
