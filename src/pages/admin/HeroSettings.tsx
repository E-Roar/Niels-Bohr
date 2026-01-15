import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { Home, Save, Sparkles, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HeroSettings = () => {
    const { content, updateHero } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.hero);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, stats: newStats });
    };

    const handleSave = () => {
        updateHero(formData);
        toast({
            title: "Section Hero sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-border/50">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-display flex items-center gap-3">
                        <Home className="w-8 h-8 sm:w-10 sm:h-10 text-bohr-blue shadow-glow-blue/20" />
                        Section Accueil (Hero)
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Personnalisez la première section visible de votre site
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave} className="h-11 px-8 rounded-xl shadow-lg shadow-bohr-blue/20 font-bold w-full sm:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden h-full">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Sparkles className="w-5 h-5 text-bohr-blue" />
                                Contenu principal
                            </CardTitle>
                            <CardDescription>
                                Titre et texte d'accroche
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Titre</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Bienvenue à"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Texte en surbrillance</label>
                                <Input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    placeholder="Groupe Scolaire Niels Bohr"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Sous-titre</label>
                                <Textarea
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Description de l'école..."
                                    className="rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Bannière d'inscription</label>
                                <Input
                                    name="bannerText"
                                    value={formData.bannerText}
                                    onChange={handleChange}
                                    placeholder="Inscriptions ouvertes 2024-2025"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all border-dashed"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden h-full">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="text-xl">Boutons d'action</CardTitle>
                            <CardDescription>
                                Texte des boutons CTA
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Bouton principal</label>
                                <Input
                                    name="ctaPrimary"
                                    value={formData.ctaPrimary}
                                    onChange={handleChange}
                                    placeholder="Inscrivez votre enfant"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Bouton secondaire</label>
                                <Input
                                    name="ctaSecondary"
                                    value={formData.ctaSecondary}
                                    onChange={handleChange}
                                    placeholder="Découvrir l'école"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <TrendingUp className="w-5 h-5 text-bohr-purple" />
                                Statistiques
                            </CardTitle>
                            <CardDescription>
                                Chiffres clés affichés dans le hero
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {formData.stats.map((stat, index) => (
                                    <div key={index} className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-4 hover:bg-muted/50 transition-colors">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Valeur</label>
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                                placeholder="15+"
                                                className="h-12 rounded-xl bg-background border-border/50 font-black text-lg text-bohr-purple"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Label</label>
                                            <Input
                                                value={stat.label}
                                                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                                placeholder="Ans d'expérience"
                                                className="h-12 rounded-xl bg-background border-border/50 font-medium"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSettings;
