import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    message: '',
  });

  const { content } = useSiteContent();
  const { contact } = content;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create WhatsApp message without manual encoding
      const text =
        `👋 *Bonjour ${content.siteInfo.name} !*\n\n` +
        `📄 *Je souhaite faire une demande d'inscription :*\n\n` +
        `👤 *Parent :* ${formData.parentName}\n` +
        `👶 *Enfant :* ${formData.childName}\n` +
        `🎂 *Âge :* ${formData.childAge}\n\n` +
        `📞 *Tél :* ${formData.phone}\n` +
        `📧 *Email :* ${formData.email}\n\n` +
        `💬 *Message :* ${formData.message || 'Aucun message supplémentaire'}`;

      // Use URLSearchParams for reliable encoding
      const params = new URLSearchParams();
      params.set('phone', content.siteInfo.whatsapp || content.siteInfo.phone);
      params.set('text', text);

      // Open WhatsApp with the message using the standard API endpoint
      window.open(`https://api.whatsapp.com/send?${params.toString()}`, '_blank');

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons très bientôt.",
      });

      // Reset form
      setFormData({
        parentName: '',
        childName: '',
        email: '',
        phone: '',
        childAge: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: content.siteInfo.phone, href: `tel:${content.siteInfo.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: content.siteInfo.email, href: `mailto:${content.siteInfo.email}` },
    { icon: MapPin, label: 'Adresse', value: `${content.siteInfo.city}, ${content.siteInfo.country}`, href: '#localisation' },
    { icon: Clock, label: 'Horaires', value: 'Lun-Ven: 8h-17h', href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-bohr-green/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-bohr-yellow/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass-card p-6 inline-block">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              <span className="gradient-text">{contact.highlight}</span> {contact.title}
            </h2>
            <p className="text-xl max-w-2xl mx-auto font-quicksand rtl:font-tajawal">
              {contact.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 text-slate-900">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden glass-card shadow-none border-0">
              <div className="h-2 bg-gradient-to-r from-bohr-yellow via-bohr-red to-bohr-purple" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bohr-purple/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-bohr-purple" />
                  </div>
                  {contact.formTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Nom du parent *</label>
                      <Input
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        required
                        className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Nom de l'enfant *</label>
                      <Input
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="Nom de l'enfant"
                        required
                        className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Téléphone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+212 6XX-XXXXXX"
                        required
                        className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Âge de l'enfant *</label>
                    <Input
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      placeholder="Ex: 5 ans"
                      required
                      className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Message (optionnel)</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Des informations supplémentaires..."
                      rows={4}
                      className="font-quicksand rtl:font-tajawal bg-white/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/10 focus:border-bohr-blue transition-colors shadow-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full shadow-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 rtl:rotate-180" />
                        Envoyer la demande
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="block"
                >
                  <Card className="h-full p-4 glass-card transition-all cursor-pointer shadow-none hover:bg-white/40 border-0">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center transition-transform">
                        <item.icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Card className="p-6 glass-card shadow-none relative overflow-hidden border-0">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-bohr-green flex items-center justify-center shadow-md brightness-110">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold font-display text-lg text-slate-900">{contact.whatsappCta}</h3>
                  <p className="text-sm text-slate-600">Réponse rapide garantie !</p>
                </div>
              </div>
              <Button
                variant="bohrGreen"
                size="lg"
                className="w-full mt-4 text-white shadow-none brightness-110"
                onClick={() => {
                  const name = content.siteInfo.name;
                  const text = language === 'fr'
                    ? `👋 *Bonjour ${name} !* \uD83C\uDFEB\nJe souhaite avoir plus d'informations sur votre établissement.`
                    : `👋 *مرحباً ${name} !* \uD83C\uDFEB\nأود الحصول على مزيد من المعلومات حول مؤسستكم.`;
                  const params = new URLSearchParams({
                    phone: content.siteInfo.whatsapp || content.siteInfo.phone,
                    text
                  });
                  window.open(`https://api.whatsapp.com/send?${params.toString()}`, '_blank');
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ouvrir WhatsApp
              </Button>
            </Card>

            {/* Features */}
            <div className="space-y-3">
              {contact.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl glass-card shadow-none transition-all border-0"
                >
                  <div className="w-6 h-6 rounded-full bg-bohr-green/20 flex items-center justify-center transition-transform">
                    <CheckCircle className="w-4 h-4 text-bohr-green brightness-110" />
                  </div>
                  <span className="text-sm font-bold font-quicksand rtl:font-tajawal text-slate-800">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
