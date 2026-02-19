const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Accordion Logic
// Accordion Logic
function initAccordion(itemSelector, headerSelector) {
    const items = document.querySelectorAll(itemSelector);

    items.forEach(item => {
        const header = item.querySelector(headerSelector);
        if (!header) return;

        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all items within this group
            items.forEach(i => i.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize What We Do Accordion
    initAccordion('.wwd__item', '.wwd__header');

    // Initialize FAQ Accordion
    initAccordion('.faq__item', '.faq__header');
});
