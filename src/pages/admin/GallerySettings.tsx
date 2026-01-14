import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent, GalleryImage } from '@/contexts/SiteContext';
import { Image, Save, Plus, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GallerySettings = () => {
    const { content, updateGallery } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.gallery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index: number, field: keyof GalleryImage, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = { ...newImages[index], [field]: value };
        setFormData({ ...formData, images: newImages });
    };

    const handleAddImage = () => {
        const newImage: GalleryImage = {
            id: Date.now().toString(),
            src: '',
            title: 'Nouvelle image',
            description: '',
        };
        setFormData({ ...formData, images: [...formData.images, newImage] });
    };

    const handleRemoveImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleFileUpload = (index: number, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            handleImageChange(index, 'src', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        updateGallery(formData);
        toast({
            title: "Galerie sauvegardée",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-border/50">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-display flex items-center gap-3">
                        <Image className="w-8 h-8 sm:w-10 sm:h-10 text-melrose-red shadow-glow-red/20" />
                        Galerie
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Gérez les images de votre galerie
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={handleAddImage} className="flex-1 sm:flex-none h-11 px-6 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                    </Button>
                    <Button variant="gradient" onClick={handleSave} className="flex-1 sm:flex-none h-11 px-8 rounded-xl shadow-lg shadow-melrose-red/20 font-bold">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                    </Button>
                </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Images */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="overflow-hidden">
                            <div className="aspect-video bg-muted relative">
                                {image.src ? (
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image className="w-12 h-12 text-muted-foreground/50" />
                                    </div>
                                )}
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Titre</label>
                                    <Input
                                        value={image.title}
                                        onChange={(e) => handleImageChange(index, 'title', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Description</label>
                                    <Input
                                        value={image.description}
                                        onChange={(e) => handleImageChange(index, 'description', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Image</label>
                                    <div className="mt-1">
                                        <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-melrose-purple transition-colors">
                                            <Upload className="w-4 h-4" />
                                            <span className="text-sm">Téléverser</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileUpload(index, file);
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GallerySettings;
