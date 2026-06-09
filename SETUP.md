# SoftZilaa Chatbot — Setup Guide

## Step 1: VS Code mein open karo
```
cd softzilaa-chatbot
code .
```

## Step 2: GitHub pe push karo
```
git init
git add .
git commit -m "SoftZilaa chatbot added"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/softzilaa-chatbot.git
git push -u origin main
```

## Step 3: Vercel pe deploy karo
```
npm i -g vercel
vercel
```
- "Set up and deploy?" → Y
- "Which scope?" → tumhara account
- "Link to existing project?" → N
- "Project name?" → softzilaa-chatbot
- "Directory?" → ./
- "Override settings?" → N

## Step 4: GROQ API Key add karo (IMPORTANT)
1. vercel.com/dashboard jao
2. Project open karo
3. Settings → Environment Variables
4. Add karo:
   - Name: GROQ_API_KEY
   - Value: tumhari gsk_xxx key yahan paste karo
5. Save karo
6. Redeploy karo: vercel --prod

## Step 5: Chatbot apni website mein lagao
chatbot.html ka sara content copy karo aur apni website ke
index.html mein </body> se pehle paste karo.

Bas! Chatbot live ho jayega! 🚀
