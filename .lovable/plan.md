

# Fix Plan: UI Issues, Footer Contrast, Admin Account Setup

## Issues Found

1. **Footer text invisible** -- The footer uses `bg-foreground` (dark brown) with `text-primary-foreground` (also dark brown), making all text unreadable
2. **No auto-admin trigger** -- The `handle_new_user` trigger creates a profile, but there's no mechanism to assign the first user as admin
3. **No admin account exists yet** -- The `user_roles` table is empty
4. **Pages render fine** -- The Shop, ProductDetail, About, Cafe, Corporate, Contact pages all look correct in code. The "improperly rendered page" in the screenshot is specifically the footer contrast issue

## Plan

### 1. Fix Footer Contrast (Critical Visual Bug)

**File:** `src/components/layout/Footer.tsx`

The footer currently uses `bg-foreground text-primary-foreground` which results in dark-on-dark text. Fix by using proper contrast colors -- white/light text on the dark background.

- Change text classes to use explicit light colors (e.g., `text-white`, `text-white/80`)
- Fix social icon hover states
- Fix newsletter input contrast

### 2. Database: Auto-Assign Admin to First Signup

Create a migration with a trigger that automatically assigns the `admin` role to the first user who signs up (when no admin exists yet). This way, when you sign up with `officialdrumroast@gmail.com`, you'll automatically become admin.

```sql
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_first_admin_assignment
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_first_admin();
```

### 3. Minor Header Fix

Add admin link visibility in mobile menu and ensure logout works properly on mobile.

## Technical Details

### Files Modified:
- `src/components/layout/Footer.tsx` -- fix text contrast on dark background
- New database migration -- add `handle_first_admin` trigger

### How Admin Setup Works:
1. You visit the site and click "Sign Up"
2. Enter email: `officialdrumroast@gmail.com` and your chosen password
3. The trigger automatically assigns you the `admin` role
4. After login, the "Admin" link appears in the navigation
5. All subsequent signups will be regular users (not admin)

