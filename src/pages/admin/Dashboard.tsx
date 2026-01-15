import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteContent } from '@/contexts/SiteContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Settings,
    Image,
    MessageCircle,
    Users,
    GraduationCap,
    Phone,
    Home,
    Eye,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const { content } = useSiteContent();
    const { t } = useLanguage();

    const quickLinks = [
        { label: t.admin.siteSettings, href: '/admin/site', icon: Settings, color: 'bohr-purple' },
        { label: t.admin.hero, href: '/admin/hero', icon: Home, color: 'bohr-blue' },
        { label: t.admin.about, href: '/admin/about', icon: Users, color: 'bohr-green' },
        { label: t.admin.programs, href: '/admin/programs', icon: GraduationCap, color: 'bohr-yellow' },
        { label: t.admin.gallery, href: '/admin/gallery', icon: Image, color: 'bohr-red' },
        { label: t.admin.contact, href: '/admin/contact', icon: Phone, color: 'bohr-orange' },
        { label: t.admin.chatbot, href: '/admin/chatbot', icon: MessageCircle, color: 'bohr-purple' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display">
                        {t.admin.dashboard}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t.admin.welcome}
                    </p>
                </div>
                <Button variant="gradient" asChild>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 rtl:ml-2 rtl:-mr-1" />
                        {t.common.backToSite}
                    </a>
                </Button>
            </div>

            {/* Site Overview */}
            <Card className="overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                    <CardTitle className="flex items-center gap-2 text-xl font-display">
                        <Settings className="w-5 h-5 text-bohr-purple" />
                        {t.admin.siteSettings}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{t.settings.title}</p>
                            <p className="font-semibold mt-1 truncate">{content.siteInfo.name}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{t.admin.email}</p>
                            <p className="font-semibold mt-1 truncate">{content.siteInfo.email}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{t.admin.phone}</p>
                            <p className="font-semibold mt-1 truncate">{content.siteInfo.phone}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{t.admin.city}</p>
                            <p className="font-semibold mt-1 truncate">{content.siteInfo.city}, {content.siteInfo.country}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Links */}
            <div>
                <h2 className="text-2xl font-bold font-display mb-6 px-1">
                    {t.admin.quickLinks}
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {quickLinks.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={item.href}>
                                <Card className="h-full hover:-translate-y-1 transition-all cursor-pointer group shadow-sm hover:shadow-md border-border/50">
                                    <CardContent className="p-5 sm:p-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`w-6 h-6 text-${item.color}`} />
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight">{item.label}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-bohr-purple py-2 px-3 bg-bohr-purple/5 rounded-lg w-fit transition-colors group-hover:bg-bohr-purple/10">
                                            <Edit className="w-3.5 h-3.5" />
                                            {t.common.edit}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <Card className="overflow-hidden border-border/50">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-xl font-display">{t.admin.stats}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="text-4xl font-black gradient-text mb-2">{content.gallery.images.length}</div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.admin.gallery}</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="text-4xl font-black gradient-text mb-2">{content.programs.programs.length}</div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.admin.programs}</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="text-4xl font-black gradient-text mb-2">{content.about.features.length}</div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.settings.features}</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="text-4xl font-black gradient-text mb-2">{content.hero.stats.length}</div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.admin.statsHero}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
