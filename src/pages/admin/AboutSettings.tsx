import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { Users, Save, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AboutSettings = () => {
    const { content, updateAbout } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.about);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeatureChange = (index: number, field: keyof typeof formData.features[0], value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSave = () => {
        updateAbout(formData);
        toast({
            title: "Section À Propos sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <Users className="w-8 h-8 text-bohr-green" />
                        Section À Propos
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Présentez votre établissement et ses atouts
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Titre de section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Titre</label>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Pourquoi"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Mot clé</label>
                                    <Input
                                        name="highlight"
                                        value={formData.highlight}
                                        onChange={handleChange}
                                        placeholder="Niels Bohr"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Sous-titre</label>
                                <Textarea
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Titre de la mission</label>
                                <Input
                                    name="missionTitle"
                                    value={formData.missionTitle}
                                    onChange={handleChange}
                                    placeholder="Notre Mission"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Texte de la mission</label>
                                <Textarea
                                    name="missionText"
                                    value={formData.missionText}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Caractéristiques</CardTitle>
                            <CardDescription>
                                Les 6 points forts de votre établissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="p-4 rounded-2xl bg-muted/50 space-y-3">
                                        <div>
                                            <label className="text-xs text-muted-foreground">Titre</label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground">Description</label>
                                            <Textarea
                                                value={feature.description}
                                                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                rows={2}
                                                className="mt-1"
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

export default AboutSettings;
