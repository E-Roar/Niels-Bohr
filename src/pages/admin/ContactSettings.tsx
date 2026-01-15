import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { Phone, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSettings = () => {
    const { content, updateContact } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.contact);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSave = () => {
        updateContact(formData);
        toast({
            title: "Section Contact sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <Phone className="w-8 h-8 text-bohr-orange" />
                        Section Contact
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Personnalisez votre section de contact
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Section Title */}
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
                                    <label className="text-sm font-medium mb-2 block">Mot clé</label>
                                    <Input
                                        name="highlight"
                                        value={formData.highlight}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Suite du titre</label>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Sous-titre</label>
                                <Textarea
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Form Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulaire</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Titre du formulaire</label>
                                <Input
                                    name="formTitle"
                                    value={formData.formTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Texte WhatsApp</label>
                                <Input
                                    name="whatsappCta"
                                    value={formData.whatsappCta}
                                    onChange={handleChange}
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
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Points forts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {formData.features.map((feature, index) => (
                                    <div key={index}>
                                        <label className="text-xs text-muted-foreground">Point {index + 1}</label>
                                        <Input
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            className="mt-1"
                                        />
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

export default ContactSettings;
