import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSiteContent } from '@/contexts/SiteContext';
import { Settings, Save, RotateCcw, Building2, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteSettings = () => {
    const { content, updateSiteInfo, resetToDefaults } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.siteInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateSiteInfo(formData);
        toast({
            title: "Paramètres sauvegardés",
            description: "Les modifications ont été enregistrées.",
        });
    };

    const handleReset = () => {
        resetToDefaults();
        setFormData(content.siteInfo);
        toast({
            title: "Réinitialisé",
            description: "Tous les paramètres ont été réinitialisés.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-border/50">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-display flex items-center gap-3">
                        <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-bohr-purple shadow-glow-purple/20" />
                        Paramètres du site
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Configurez les informations générales de votre site
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none h-11 px-6 rounded-xl border-border/50">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Réinitialiser
                    </Button>
                    <Button variant="gradient" onClick={handleSave} className="flex-1 sm:flex-none h-11 px-8 rounded-xl shadow-lg shadow-bohr-purple/20 font-bold">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl">
                {/* Identity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden h-full">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Building2 className="w-5 h-5 text-bohr-purple" />
                                Identité
                            </CardTitle>
                            <CardDescription>
                                Nom et slogan de votre établissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Nom du site</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Groupe Scolaire Niels Bohr"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Slogan</label>
                                <Input
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    placeholder="Établissement Privé"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden h-full">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Phone className="w-5 h-5 text-bohr-blue" />
                                Contact
                            </CardTitle>
                            <CardDescription>
                                Coordonnées de contact
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" /> Téléphone
                                </label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+212 6XX-XXXXXX"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-2">
                                    <Globe className="w-3.5 h-3.5" /> WhatsApp
                                </label>
                                <Input
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="212XXXXXXXXX"
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Location */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="border-border/50 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/30">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <MapPin className="w-5 h-5 text-bohr-green" />
                                Adresse
                            </CardTitle>
                            <CardDescription>
                                Localisation de votre établissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2 md:col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Adresse</label>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="123 Rue Example"
                                        className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Ville</label>
                                    <Input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Casablanca"
                                        className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Pays</label>
                                    <Input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Maroc"
                                        className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default SiteSettings;
