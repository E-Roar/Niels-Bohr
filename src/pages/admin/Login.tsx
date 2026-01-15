import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { t, direction } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                toast.success('Connexion réussie');
                navigate('/admin');
            } else {
                toast.error('Email ou mot de passe incorrect');
            }
        } catch (error) {
            toast.error('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f0f4f9] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-bohr-blue/5 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-bohr-purple/5 blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Back Button */}
                <motion.button
                    whileHover={{ x: direction === 'rtl' ? 5 : -5 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-bohr-blue transition-colors mb-8 font-medium"
                >
                    <ArrowLeft size={20} className={direction === 'rtl' ? 'rotate-180' : ''} />
                    {t.common.backToSite}
                </motion.button>

                <div className="bg-[#f0f4f9] rounded-[2.5rem] p-8 md:p-12 neo-raised border border-white/50">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-[#f0f4f9] rounded-2xl neo-raised flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-bohr-blue" />
                        </div>
                        <h1 className="text-3xl font-black font-display mb-2 text-slate-800">
                            {t.nav.admin}
                        </h1>
                        <p className="text-slate-500 font-medium font-quicksand rtl:font-tajawal">
                            {t.admin.loginSubtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 block px-4">
                                {t.admin.email}
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-bohr-blue transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="demo@NielsBohr.com"
                                    required
                                    className="h-14 pl-12 pr-4 bg-[#f0f4f9] border-none rounded-2xl neo-pressed focus-visible:ring-2 focus-visible:ring-bohr-blue/30 text-slate-700 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 block px-4">
                                {t.admin.password}
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-bohr-blue transition-colors">
                                    <Lock size={18} />
                                </div>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="h-14 pl-12 pr-4 bg-[#f0f4f9] border-none rounded-2xl neo-pressed focus-visible:ring-2 focus-visible:ring-bohr-blue/30 text-slate-700 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-bohr-blue to-bohr-purple hover:from-bohr-blue/90 hover:to-bohr-purple/90 text-white font-bold text-lg neo-button shadow-lg transition-all group active:scale-95"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>{t.admin.login}</span>
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="inline-block"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-10 space-y-4">
                        <div className="p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 text-center">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                {t.common.demoMode}
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('demo@NielsBohr.com');
                                        toast.success('Email copié');
                                    }}
                                    className="flex items-center justify-between px-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl transition-colors text-sm font-medium text-slate-700 border border-white/20 group"
                                >
                                    <span>demo@NielsBohr.com</span>
                                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded uppercase text-slate-500 group-hover:bg-bohr-blue group-hover:text-white transition-colors">Copier</span>
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('demo123');
                                        toast.success('Mot de passe copié');
                                    }}
                                    className="flex items-center justify-between px-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl transition-colors text-sm font-medium text-slate-700 border border-white/20 group"
                                >
                                    <span>demo123</span>
                                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded uppercase text-slate-500 group-hover:bg-bohr-blue group-hover:text-white transition-colors">Copier</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
