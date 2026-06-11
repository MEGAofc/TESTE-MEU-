// Contador Animado
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer para disparar o contador quando o usuário rolar até ele
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(statsSection);
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

// Lógica do Formulário de Diagnóstico (Passo a Passo)
function nextStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStep = document.getElementById('step' + step);
    
    // Validação simples
    const inputs = currentStep.querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(i => { if(i.hasAttribute('required') && !i.value) valid = false; });
    
    if(!valid) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
    }

    currentStep.classList.remove('active');
    nextStep.classList.add('active');
}

// Escuta cliques nos cards de opção para pular automaticamente para o passo 2
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
        setTimeout(() => nextStep(2), 300);
    });
});

// Slider de Testemunhos
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial() {
    testimonials.forEach(t => t.classList.remove('active'));
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

setInterval(showTestimonial, 4000);

// Header sticky ao rolar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255,255,255,0.95)';
    } else {
        header.style.padding = '15px 0';
        header.style.background = '#fff';
    }
});

document.getElementById('filter-form').addEventListener('submit', function(e){

    e.preventDefault();

    const servico = document.querySelector('input[name="necessidade"]:checked')?.value || '';

    const faturamento = document.querySelector('select[name="faturamento"]').value;

    const nome = document.querySelector('input[placeholder="Seu Nome"]').value;

    const email = document.querySelector('input[type="email"]').value;

    const whatsapp = document.querySelector('input[type="tel"]').value;

    const mensagem = `
Olá, ADR Costa Contábil!

Tenho interesse em:

📌 Serviço: ${servico}

👤 Nome: ${nome}

💰 Faturamento: ${faturamento}

📧 E-mail: ${email}

📱 WhatsApp: ${whatsapp}

Gostaria de receber uma proposta.
`;

    const numero = "5511999999999";

    window.open(
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
        '_blank'
    );

});