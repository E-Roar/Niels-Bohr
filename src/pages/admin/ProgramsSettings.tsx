import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { GraduationCap, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProgramsSettings = () => {
    const { content, updatePrograms } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.programs);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProgramChange = (index: number, field: string, value: string | string[]) => {
        const newPrograms = [...formData.programs];
        newPrograms[index] = { ...newPrograms[index], [field]: value };
        setFormData({ ...formData, programs: newPrograms });
    };

    const handleSave = () => {
        updatePrograms(formData);
        toast({
            title: "Section Programmes sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-border/50">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-display flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-melrose-yellow shadow-glow-yellow/20" />
                        Section Programmes
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Gérez vos programmes éducatifs
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave} className="h-11 px-8 rounded-xl shadow-lg shadow-melrose-yellow/20 font-bold w-full sm:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                </Button>
            </div>

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="border-border/50 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b border-border/30">
                        <CardTitle className="text-xl">Paramètres de section</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Titre</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Mot clé</label>
                                <Input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Bouton CTA</label>
                                <Input
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Sous-titre</label>
                            <Textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                rows={3}
                                className="rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all resize-none"
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Programs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {formData.programs.map((program, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-border/50 shadow-sm overflow-hidden h-full">
                            <CardHeader className="bg-muted/30 border-b border-border/30">
                                <CardTitle className="text-xl font-display">{program.title || `Programme ${index + 1}`}</CardTitle>
                                <CardDescription className="text-melrose-purple font-bold">
                                    Tranche d'âge: {program.age}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Titre</label>
                                        <Input
                                            value={program.title}
                                            onChange={(e) => handleProgramChange(index, 'title', e.target.value)}
                                            className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Âge</label>
                                        <Input
                                            value={program.age}
                                            onChange={(e) => handleProgramChange(index, 'age', e.target.value)}
                                            className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Description</label>
                                    <Textarea
                                        value={program.description}
                                        onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                                        rows={3}
                                        className="rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Points clés (séparés par virgule)</label>
                                    <Input
                                        value={program.features.join(', ')}
                                        onChange={(e) => handleProgramChange(index, 'features', e.target.value.split(', '))}
                                        className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-all border-dashed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProgramsSettings;
