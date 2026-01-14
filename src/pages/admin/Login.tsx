import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminLogin = () => {
    const { login, error, isLoading } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            window.location.href = '/admin';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center light-neo-theme bg-soft-gradient p-4 font-quicksand rtl:font-tajawal">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="flex justify-end mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="bg-background/80 backdrop-blur text-foreground"
                        title={language === 'fr' ? 'Switch to Arabic' : 'Passer en Français'}
                    >
                        {language === 'fr' ? 'ع' : 'Fr'}
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />

                    <CardHeader className="text-center pb-2">
                        <motion.img
                            src={logo}
                            alt="Groupe Scolaire Niels Bohr"
                            className="h-24 w-auto mx-auto mb-4"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        />
                        <CardTitle className="text-2xl font-display">
                            {t.nav.admin}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-2">
                            {t.admin.loginSubtitle}
                        </p>
                    </CardHeader>

                    <CardContent>
                        {/* Demo credentials notice */}
                        <div className="mb-6 p-4 rounded-2xl bg-accent/50 border border-accent">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-semibold text-foreground">{t.common.demoMode}</p>
                                    <p className="text-muted-foreground mt-1">
                                        Email de démonstration : <code className="bg-muted px-1 py-0.5 rounded">demo@NielsBohr.com</code>
                                    </p>
                                    <p className="text-muted-foreground">
                                        {t.admin.password}: <code className="bg-background px-1 rounded">demo123</code>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-2"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="demo@NielsBohr.com"
                                        className="pl-10 rtl:pl-3 rtl:pr-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.admin.password}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 rtl:pl-3 rtl:pr-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="gradient"
                                size="lg"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t.common.loading}
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5 rtl:ml-2 rtl:-mr-1" />
                                        {t.admin.login}
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
                                <span className="rtl:hidden">←</span> {t.common.backToSite} <span className="ltr:hidden">→</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
