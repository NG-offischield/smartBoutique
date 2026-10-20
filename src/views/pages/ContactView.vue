<script setup>
import { reactive, ref } from 'vue'
import { Phone, MapPin, Clock, Send, ExternalLink, Navigation } from 'lucide-vue-next'
import PageHero from '@/views/components/PageHero.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { shop, fullAddress } from '@/config/shop'
import { contact } from '@/controllers/contactController'
import { useToasts } from '@/controllers/toastController'

const subjects = ['Disponibilité d’un téléphone', 'Demande de prix', 'Reprise de mon ancien téléphone', 'Réparation / SAV', 'Livraison', 'Autre']
const form = reactive({ name: '', subject: subjects[0], message: '' })
const errors = reactive({ name: '', message: '' })
const submitted = ref(false)
const { notify } = useToasts()

function validate() {
  errors.name = form.name.trim().length >= 2 ? '' : 'Indiquez votre nom (2 caractères minimum).'
  errors.message = form.message.trim().length >= 10 ? '' : 'Votre message doit contenir au moins 10 caractères.'
  return !errors.name && !errors.message
}

function submit() {
  submitted.value = true
  if (!validate()) {
    document.getElementById(errors.name ? 'c-name' : 'c-message')?.focus()
    return
  }
  window.open(contact.whatsappLink(contact.formMessage(form)), '_blank', 'noopener')
  notify('WhatsApp s’ouvre avec votre message. Il ne reste plus qu’à l’envoyer !', { tone: 'success', duration: 5000 })
}
</script>

<template>
  <div>
    <PageHero title="Contact & accès" subtitle="Une question, un devis, une disponibilité ? Notre équipe vous répond rapidement." crumb="Contact" />
    <section class="section">
      <div class="container contact">
        <div class="contact__cards">
          <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="ccard ccard--wa">
            <span class="ccard__icon"><WhatsAppIcon /></span>
            <span><strong>WhatsApp</strong><span>{{ shop.phoneDisplay }}</span><small>Réponse en quelques minutes</small></span>
          </a>
          <a :href="contact.telLink" class="ccard">
            <span class="ccard__icon"><Phone /></span>
            <span><strong>Téléphone</strong><span>{{ shop.phoneDisplay }}</span><small>Appel direct pendant les horaires</small></span>
          </a>
          <a :href="contact.mapsLink" target="_blank" rel="noopener" class="ccard">
            <span class="ccard__icon"><MapPin /></span>
            <span><strong>Adresse</strong><span>{{ fullAddress }}</span><small>Ouvrir dans Google Maps</small></span>
          </a>
          <div class="ccard">
            <span class="ccard__icon"><Clock /></span>
            <span>
              <strong>Horaires</strong>
              <span v-for="h in shop.openingHours" :key="h.days" class="hours"><span>{{ h.days }}</span><span>{{ h.hours }}</span></span>
            </span>
          </div>
        </div>

        <form class="cform card" novalidate @submit.prevent="submit">
          <h2>Écrivez-nous</h2>
          <p class="muted">Votre message sera envoyé via WhatsApp : aucune donnée n’est stockée sur ce site.</p>
          <div class="field">
            <label for="c-name">Votre nom *</label>
            <input id="c-name" v-model="form.name" class="input" autocomplete="name" :aria-invalid="submitted && !!errors.name" aria-describedby="c-name-err" @input="submitted && validate()" />
            <span v-if="submitted && errors.name" id="c-name-err" class="field-error" role="alert">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="c-subject">Objet</label>
            <select id="c-subject" v-model="form.subject" class="select">
              <option v-for="s in subjects" :key="s">{{ s }}</option>
            </select>
          </div>
          <div class="field">
            <label for="c-message">Message *</label>
            <textarea id="c-message" v-model="form.message" class="textarea" placeholder="Ex. : Bonjour, avez-vous l’iPhone 16 128 Go en noir ?" :aria-invalid="submitted && !!errors.message" aria-describedby="c-message-err" @input="submitted && validate()"></textarea>
            <span v-if="submitted && errors.message" id="c-message-err" class="field-error" role="alert">{{ errors.message }}</span>
          </div>
          <button type="submit" class="btn btn--whatsapp btn--lg btn--block"><Send /> Envoyer sur WhatsApp</button>
        </form>
      </div>

      <div class="container">
        <div class="map card">
          <iframe :src="contact.mapEmbed" title="Carte : localisation de The Smart Boutique à Yaoundé" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="map__overlay">
            <p><strong>{{ shop.name }}</strong><br />{{ fullAddress }}</p>
            <a :href="contact.mapsLink" target="_blank" rel="noopener" class="btn btn--primary btn--sm"><Navigation /> Itinéraire <ExternalLink /></a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: 1fr 1.1fr; gap: 32px; align-items: start; margin-bottom: 40px; }
.contact__cards { display: grid; gap: 14px; }
.ccard { display: flex; gap: 16px; padding: 20px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); transition: all 0.3s var(--ease); }
a.ccard:hover { border-color: var(--brand-400); transform: translateY(-2px); box-shadow: var(--shadow); }
.ccard > span:last-child { display: grid; gap: 2px; flex: 1; }
.ccard small { color: var(--text-muted); }
.ccard__icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; background: var(--brand-50); color: var(--brand-500); flex-shrink: 0; }
:root[data-theme='dark'] .ccard__icon { color: #a5b4fc; }
.ccard__icon svg { width: 22px; height: 22px; }
.ccard--wa .ccard__icon { background: var(--whatsapp); color: #fff; }
.hours { display: flex; justify-content: space-between; gap: 12px; font-size: 0.9rem; color: var(--text-muted); }
.cform { padding: 28px; display: grid; gap: 16px; }
.cform h2 { margin: 0; font-size: 1.5rem; }
.cform > p { margin: -8px 0 0; font-size: 0.9rem; }
.map { position: relative; overflow: hidden; height: 420px; padding: 0; }
.map iframe { width: 100%; height: 100%; border: 0; display: block; }
.map__overlay { position: absolute; left: 16px; bottom: 16px; display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: var(--radius); background: var(--surface); box-shadow: var(--shadow); flex-wrap: wrap; max-width: calc(100% - 32px); }
.map__overlay p { margin: 0; font-size: 0.9rem; }
@media (max-width: 900px) { .contact { grid-template-columns: 1fr; } .map { height: 340px; } }
</style>
