import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteContent } from '@/contexts/SiteContext';
import { MessageCircle, Save, Upload, Bot, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChatbotSettings = () => {
    const { content, updateChatbot } = useSiteContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState(content.chatbot);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, avatar: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleRagFileUpload = (files: FileList) => {
        const newFiles = Array.from(files).map(f => f.name);
        setFormData({ ...formData, ragFiles: [...formData.ragFiles, ...newFiles] });
        toast({
            title: "Fichiers ajoutés",
            description: `${files.length} fichier(s) ajouté(s) pour le RAG.`,
        });
    };

    const handleRemoveRagFile = (index: number) => {
        const newFiles = formData.ragFiles.filter((_, i) => i !== index);
        setFormData({ ...formData, ragFiles: newFiles });
    };

    const handleSave = () => {
        updateChatbot(formData);
        toast({
            title: "Chatbot sauvegardé",
            description: "Les modifications ont été enregistrées.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                        <MessageCircle className="w-8 h-8 text-bohr-purple" />
                        Chatbot IA
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Configurez votre assistant virtuel
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Identity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                Identité
                            </CardTitle>
                            <CardDescription>
                                Nom et avatar du chatbot
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Nom du chatbot</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Assistant Niels Bohr"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Avatar</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-muted overflow-hidden">
                                        {formData.avatar ? (
                                            <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Bot className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="flex-1">
                                        <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-bohr-purple transition-colors">
                                            <Upload className="w-4 h-4" />
                                            <span className="text-sm">Changer l'avatar</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleAvatarUpload(file);
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Message d'accueil</label>
                                <Textarea
                                    name="greeting"
                                    value={formData.greeting}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* System Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Système</CardTitle>
                            <CardDescription>
                                Instructions pour l'IA (comportement, ton, limites)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Textarea
                                    name="systemPrompt"
                                    value={formData.systemPrompt}
                                    onChange={handleChange}
                                    rows={8}
                                    placeholder="Tu es l'assistant virtuel du Groupe Scolaire Niels Bohr..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Réponse par défaut</label>
                                <Textarea
                                    name="fallbackResponse"
                                    value={formData.fallbackResponse}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Réponse quand le chatbot ne peut pas aider"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* RAG Files */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Base de connaissances (RAG)
                            </CardTitle>
                            <CardDescription>
                                Téléversez des documents pour enrichir les réponses du chatbot
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-bohr-purple transition-colors">
                                    <Upload className="w-6 h-6" />
                                    <span>Téléverser des fichiers (PDF, TXT, DOCX)</span>
                                    <input
                                        type="file"
                                        accept=".pdf,.txt,.docx,.doc"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files) handleRagFileUpload(e.target.files);
                                        }}
                                    />
                                </label>
                            </div>

                            {formData.ragFiles.length > 0 ? (
                                <div className="space-y-2">
                                    {formData.ragFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-bohr-purple" />
                                                <span className="text-sm">{file}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveRagFile(index)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                Supprimer
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-4">
                                    Aucun fichier téléversé
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default ChatbotSettings;
