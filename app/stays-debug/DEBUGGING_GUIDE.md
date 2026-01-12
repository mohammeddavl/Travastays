# DEBUGGING GUIDE - RentalWise API Integration

## 🚨 API Not Working? Follow These Steps

I've created **3 debugging tools** to help you identify and fix the problem.

---

## 🛠️ **Debug Tools**

### 1. **Debug Page** (`/stays-debug`)
Shows exactly what's happening with the API in real-time.

**Setup:**
```bash
# Create the page
mkdir -p app/stays-debug
# Copy stays-debug-page.tsx → app/stays-debug/page.tsx
```

**What it shows:**
- ✅ Environment variables status
- ✅ Config validation
- ✅ API response details
- ✅ Exact error messages
- ✅ Properties data structure

**Usage:**
Visit: `http://localhost:3000/stays-debug`

---

### 2. **Test API Page** (`/test-api`)
Simple connection test.

**Setup:**
```bash
# Create the page
mkdir -p app/test-api
# Copy test-api-page.tsx → app/test-api/page.tsx
```

**Usage:**
Visit: `http://localhost:3000/test-api`

---

### 3. **Robust Grid Component**
Handles ANY API response format automatically.

**Setup:**
```tsx
// In app/stays/page.tsx, change:
import { StaysGrid } from "@/components/stays/stays-grid-robust"
```

**Features:**
- ✅ Detects different response formats
- ✅ Handles missing fields gracefully
- ✅ Shows success/error messages
- ✅ Provides helpful troubleshooting tips

---

## 📋 **Step-by-Step Debugging Process**

### **Step 1: Check Environment Variables**

```bash
# Print your .env.local
cat .env.local

# Should show:
# NEXT_PUBLIC_RENTALWISE_API_URL=https://api.rentalwise.com/v1
# NEXT_PUBLIC_RENTALWISE_API_KEY=your_key_here
# NEXT_PUBLIC_RENTALWISE_ENVIRONMENT=staging
```

**Common Issues:**
- ❌ File doesn't exist → Create it
- ❌ Missing `NEXT_PUBLIC_` prefix → Won't work in browser
- ❌ Key has quotes around it → Remove quotes
- ❌ Extra spaces → Remove them

---

### **Step 2: Restart Development Server**

```bash
# IMPORTANT: Stop the server (Ctrl+C)
# Then restart:
npm run dev

# Environment variables ONLY load on startup!
```

---

### **Step 3: Visit Debug Page**

Go to: `http://localhost:3000/stays-debug`

**What to look for:**

✅ **If Working:**
```json
{
  "apiKeySet": true,
  "apiKeyLength": 40,  // Or whatever your key length is
  "configValid": true,
  "propertiesCount": 10  // Or however many properties
}
```

❌ **If NOT Working:**

**Problem 1: API Key Not Set**
```json
{
  "apiKeySet": false,
  "apiKeyLength": 0
}
```
**Fix:** Create/update .env.local, restart server

**Problem 2: API Error**
```json
{
  "error": {
    "status": 401,
    "message": "Unauthorized"
  }
}
```
**Fix:** Check your API key is correct

**Problem 3: CORS Error**
```json
{
  "error": {
    "message": "CORS policy..."
  }
}
```
**Fix:** Contact RentalWise to whitelist localhost

---

### **Step 4: Check Browser Console**

1. Press `F12` (or right-click → Inspect)
2. Go to **Console** tab
3. Look for:

**Good signs (✅):**
```
🔄 Fetching properties from RentalWise...
✅ API Response: { data: [...] }
📦 Extracted properties: 10 [...]
✨ Transformed properties: [...]
```

**Bad signs (❌):**
```
❌ Error fetching properties: ...
⚠️ RentalWise API key is not configured
```

---

### **Step 5: Check Network Tab**

1. Press `F12`
2. Go to **Network** tab
3. Click **Fetch/XHR** filter
4. Reload the page
5. Look for requests to `api.rentalwise.com`

**Click on the request** to see:
- **Headers:** Check Authorization header has your key
- **Response:** See what the API returned
- **Status:** 200 = success, 401 = bad key, 404 = wrong URL

---

## 🔧 **Common Problems & Solutions**

### Problem: "Cannot find module"

**Error:**
```
Cannot find module '@/lib/rentalwise/api'
```

**Solution:**
```bash
# Check files exist:
ls lib/rentalwise/api.ts
ls types/rentalwise.ts
ls hooks/use-rentalwise.ts

# If missing, copy them from the integration package
```

---

### Problem: API Key Not Working

**Symptoms:**
- 401 Unauthorized
- "Invalid API key"

**Solutions:**

1. **Verify key is correct:**
   ```bash
   cat .env.local
   # Check for typos, extra spaces
   ```

2. **Check key format:**
   ```env
   # CORRECT:
   NEXT_PUBLIC_RENTALWISE_API_KEY=abc123xyz

   # WRONG:
   NEXT_PUBLIC_RENTALWISE_API_KEY="abc123xyz"  # No quotes
   NEXT_PUBLIC_RENTALWISE_API_KEY = abc123xyz  # No spaces around =
   ```

3. **Verify with RentalWise:**
   - Email: contact@rentalwise.com
   - Ask them to verify your key is active

---

### Problem: CORS Error

**Error:**
```
Access to fetch at 'https://api.rentalwise.com' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
Contact RentalWise support and ask them to whitelist:
- `http://localhost:3000` (for development)
- Your production domain (when deploying)

---

### Problem: Properties Not Showing

**Scenario 1: No Error, Just Empty**
- API call succeeded but returned 0 properties

**Check:**
1. Visit `/stays-debug` to see raw response
2. Maybe you have no properties in your RentalWise account yet
3. Try creating test properties in RentalWise dashboard

**Scenario 2: Response Format Doesn't Match**
- API returned properties but in different format

**Solution:**
Use the **Robust Grid** component:
```tsx
import { StaysGrid } from "@/components/stays/stays-grid-robust"
```
This handles any format automatically!

---

### Problem: TypeScript Errors

**Error:**
```
Cannot find name 'RentalWiseProperty'
Type errors in use-rentalwise.ts
```

**Solution:**
```bash
# Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# Or just restart your dev server
npm run dev
```

---

## 🎯 **Quick Checklist**

Before asking for help, verify ALL of these:

- [ ] `.env.local` exists in project root (same level as package.json)
- [ ] API key is set correctly in `.env.local`
- [ ] No quotes around the API key value
- [ ] Variables start with `NEXT_PUBLIC_`
- [ ] Development server was restarted AFTER creating .env.local
- [ ] All integration files are in the correct folders
- [ ] Visited `/stays-debug` and checked the output
- [ ] Checked browser console for errors
- [ ] Checked Network tab for API requests
- [ ] Used the Robust Grid component

---

## 📞 **Get Help**

### If you've done ALL the above and it still doesn't work:

**Share this information:**

1. **Screenshot of `/stays-debug` page**
2. **Browser console errors** (F12 → Console)
3. **Network tab** (F12 → Network → failed request)
4. **Your `.env.local`** (WITHOUT the actual API key, replace it with `xxx`)
   ```env
   NEXT_PUBLIC_RENTALWISE_API_URL=https://api.rentalwise.com/v1
   NEXT_PUBLIC_RENTALWISE_API_KEY=xxx
   NEXT_PUBLIC_RENTALWISE_ENVIRONMENT=staging
   ```

### Contact RentalWise:
- Email: contact@rentalwise.com
- They can verify your API setup server-side

---

## 🎉 **Success Indicators**

You'll know it's working when:

1. ✅ `/stays-debug` shows "Config Valid: ✅ YES"
2. ✅ `/stays-debug` shows "Properties Found: X" (where X > 0)
3. ✅ Console shows: "✅ API Response: { data: [...] }"
4. ✅ Network tab shows successful requests (status 200)
5. ✅ Properties appear on your stays page
6. ✅ No errors in console

---

**Start with visiting `/stays-debug` - it will tell you exactly what's wrong!**
