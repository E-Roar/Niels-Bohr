import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
    Home,
    Settings,
    Image,
    MessageCircle,
    Users,
    GraduationCap,
    Phone,
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Menu,
    X,
    AlertTriangle,
    Globe
} from 'lucide-react';
import logo from '@/assets/logo.png';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const { t, language, toggleLanguage, direction } = useLanguage();
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { label: t.admin.dashboard, href: '/admin', icon: LayoutDashboard, end: true },
        { label: t.admin.siteSettings, href: '/admin/site', icon: Settings },
        { label: t.admin.hero, href: '/admin/hero', icon: Home },
        { label: t.admin.about, href: '/admin/about', icon: Users },
        { label: t.admin.programs, href: '/admin/programs', icon: GraduationCap },
        { label: t.admin.gallery, href: '/admin/gallery', icon: Image },
        { label: t.admin.contact, href: '/admin/contact', icon: Phone },
        { label: t.admin.chatbot, href: '/admin/chatbot', icon: MessageCircle },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/admin/login';
    };

    const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
        <div className="flex flex-col h-full font-quicksand rtl:font-tajawal">
            {/* Logo */}
            <div className={`p-4 border-b border-border ${sidebarCollapsed && !mobile ? 'px-2' : ''}`}>
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Groupe Scolaire Niels Bohr" className={`${sidebarCollapsed && !mobile ? 'h-10' : 'h-12'} w-auto`} />
                    {(!sidebarCollapsed || mobile) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 min-w-0"
                        >
                            <p className="font-bold font-display text-sm truncate">Groupe Scolaire Niels Bohr</p>
                            <p className="text-xs text-muted-foreground">{t.nav.admin}</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.end}
                        onClick={() => mobile && setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-melrose-purple to-melrose-blue text-white shadow-glow-purple'
                                : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                            } ${sidebarCollapsed && !mobile ? 'justify-center px-2' : ''}`
                        }
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {(!sidebarCollapsed || mobile) && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm font-medium truncate"
                            >
                                {item.label}
                            </motion.span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Language & User Info */}
            <div className={`p-3 border-t border-border ${sidebarCollapsed && !mobile ? 'px-2' : ''}`}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-full mb-3 flex items-center gap-2 justify-center"
                    title={language === 'fr' ? 'Switch to Arabic' : 'Passer en Français'}
                >
                    <Globe className="w-4 h-4" />
                    {(!sidebarCollapsed || mobile) && (
                        <span className="font-tajawal">
                            {language === 'fr' ? 'العربية' : 'Français'}
                        </span>
                    )}
                </Button>

                {(!sidebarCollapsed || mobile) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-3 px-3"
                    >
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </motion.div>
                )}
                <Button
                    variant="ghost"
                    size={sidebarCollapsed && !mobile ? 'icon' : 'default'}
                    onClick={handleLogout}
                    className={`w-full ${sidebarCollapsed && !mobile ? '' : ''}`}
                >
                    <LogOut className="w-4 h-4" />
                    {(!sidebarCollapsed || mobile) && <span>{t.nav.logout}</span>}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-soft-gradient light-neo-theme flex" dir={direction}>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 72 : 280 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`hidden lg:flex flex-col bg-card/80 backdrop-blur-md shadow-neo fixed top-0 bottom-0 z-40 ${direction === 'rtl' ? 'right-0' : 'left-0'}`}
            >
                <SidebarContent />

                {/* Collapse button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`absolute top-20 w-6 h-6 rounded-full bg-background shadow-neo flex items-center justify-center hover:shadow-neo-lg transition-all ${direction === 'rtl' ? '-left-3' : '-right-3'}`}
                >
                    {(sidebarCollapsed && direction === 'ltr') || (!sidebarCollapsed && direction === 'rtl') ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </button>
            </motion.aside>

            {/* Mobile Menu Button */}
            <div className={`lg:hidden fixed top-4 z-50 ${direction === 'rtl' ? 'right-4' : 'left-4'}`}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: direction === 'rtl' ? 280 : -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: direction === 'rtl' ? 280 : -280 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={`lg:hidden fixed top-0 bottom-0 w-72 bg-card shadow-neo-lg z-50 ${direction === 'rtl' ? 'right-0' : 'left-0'}`}
                        >
                            <SidebarContent mobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <motion.main
                initial={false}
                animate={{
                    marginLeft: isDesktop ? (direction === 'ltr' ? (sidebarCollapsed ? 72 : 280) : 0) : 0,
                    marginRight: isDesktop ? (direction === 'rtl' ? (sidebarCollapsed ? 72 : 280) : 0) : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`flex-1 min-w-0 transition-all duration-300 overflow-y-auto`}
            >
                {/* Demo Banner */}
                <div className="bg-accent/40 backdrop-blur-sm text-foreground border-b border-border px-4 py-2 sticky top-0 z-30 shadow-sm">
                    <div className="container mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span className="truncate">🔔 {t.common.demoMode}</span>
                    </div>
                </div>

                {/* Page content */}
                <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 font-quicksand rtl:font-tajawal max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </motion.main>
        </div>
    );
};

export default AdminLayout;
