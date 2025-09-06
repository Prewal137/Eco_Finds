# 🔧 EcoFinds Troubleshooting Guide

## Common Issues and Solutions

### 🚨 **413 Payload Too Large Error**

**Problem**: Getting "Payload Too Large" error when uploading images.

**Solutions**:
1. **Backend limits increased**: Server now accepts up to 50MB payloads
2. **Image compression**: Frontend automatically compresses images to max 800px width
3. **File size validation**: Maximum 5MB per image file
4. **Automatic optimization**: Images are converted to JPEG with 80% quality

**If still getting errors**:
- Try uploading smaller images
- Check your internet connection
- Restart the backend server

### 🚨 **401 Unauthorized Errors**

**Problem**: Getting "Authentication required" errors when trying to access protected routes.

**Solutions**:
1. **Check if backend is running**:
   ```bash
   # In backend directory
   npm run dev
   ```
   Should show: `✅ Server running on port 5000`

2. **Verify database connection**:
   - Make sure MySQL is running
   - Check `.env` file has correct credentials
   - Test connection: `mysql -u your_username -p`

3. **Check environment files**:
   - Backend: `backend/.env` (copy from `env.example`)
   - Frontend: `Eco_Finds/.env.local` (copy from `env.example`)

4. **Test API connection**:
   Visit: http://localhost:3000/test-api

### ⚠️ **React.forwardRef Warning**

**Problem**: "Function components cannot be given refs" warning.

**Solution**: ✅ **FIXED** - Updated Button component with `React.forwardRef`

### 🌐 **Hydration Warning (webcrx)**

**Problem**: "Extra attributes from the server: webcrx" warning.

**Solution**: This is **harmless** - caused by browser extensions. Can be safely ignored.

### 🗄️ **Database Issues**

**Problem**: Database connection errors.

**Solutions**:
1. **Install MySQL** if not installed
2. **Create database**:
   ```sql
   CREATE DATABASE ecofinds_db;
   ```
3. **Run setup script**:
   ```bash
   mysql -u root -p < backend/setup-database.sql
   ```

### 🔌 **CORS Errors**

**Problem**: Cross-origin request blocked.

**Solution**: Backend CORS is configured for `localhost:3000` and `localhost:3001`

### 📦 **Dependency Issues**

**Problem**: Module not found errors.

**Solutions**:
1. **Clear node_modules**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. **Check Node.js version**: Requires Node.js 18+

### 🚀 **Quick Start Commands**

**Windows**:
```bash
# Run the automated setup
start-dev.bat
```

**Linux/Mac**:
```bash
# Run the automated setup
./start-dev.sh
```

**Manual**:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd Eco_Finds
npm install
npm run dev
```

### 🧪 **Testing Your Setup**

1. **Test Backend**: Visit http://localhost:5000/api/ping
2. **Test Frontend**: Visit http://localhost:3000/test-api
3. **Test Database**: Check if tables were created
4. **Test Authentication**: Try registering a new user

### 📋 **Environment Variables Checklist**

**Backend (.env)**:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=ecofinds_db
PORT=5000
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

### 🔍 **Debug Steps**

1. **Check console errors** in browser DevTools
2. **Check backend logs** in terminal
3. **Verify API endpoints** with test page
4. **Check database** with MySQL client
5. **Verify environment files** are properly set

### 📞 **Still Having Issues?**

1. **Check the logs** in both frontend and backend terminals
2. **Verify all dependencies** are installed
3. **Ensure MySQL is running** and accessible
4. **Check firewall/antivirus** isn't blocking ports 3000/5000
5. **Try restarting** both servers

### 🎯 **Expected Behavior**

- ✅ Backend starts on port 5000
- ✅ Frontend starts on port 3000  
- ✅ Database tables are created
- ✅ API endpoints respond correctly
- ✅ Authentication works
- ✅ No console errors (except harmless hydration warning)

---

**Need more help?** Check the main README.md for detailed setup instructions.
