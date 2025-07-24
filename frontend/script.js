// Menunggu sampai seluruh halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen-elemen yang kita butuhkan dari HTML
    const chatForm = document.getElementById('chat-form');
    const promptInput = document.getElementById('prompt-input');
    const submitButton = document.getElementById('submit-button');
    const responseArea = document.getElementById('response-area');

    // Alamat API Backend kita
    const API_URL = 'http://localhost:3001/api/chat';

    // Tambahkan event listener saat form di-submit
    chatForm.addEventListener('submit', async (event) => {
        // Mencegah halaman refresh saat form dikirim
        event.preventDefault();

        const message = promptInput.value;
        if (!message) return; // Jangan lakukan apa-apa jika input kosong

        // === KELOLA STATE PADA UI (LANGKAH PENTING!) ===
        // 1. Nonaktifkan tombol dan input agar user tidak mengirim pesan ganda
        submitButton.disabled = true;
        submitButton.textContent = 'Memproses...';
        responseArea.textContent = 'Menghubungi AI...';
        // =============================================

        try {
            // Lakukan panggilan API ke backend menggunakan fetch
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }), // Kirim pesan dalam format JSON
            });

            // Jika respons dari server tidak OK (bukan status 2xx)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Ambil data JSON dari respons
            const data = await response.json();

            // Tampilkan balasan dari AI di response area
            responseArea.textContent = data.reply;

        } catch (error) {
            // Tangani jika terjadi error koneksi atau error dari server
            console.error('Terjadi kesalahan:', error);
            responseArea.textContent = 'Maaf, terjadi kesalahan saat menghubungi server.';
        } finally {
            // === KEMBALIKAN STATE UI KE SEMULA ===
            // Bagian ini akan selalu dijalankan, baik berhasil maupun gagal
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim';
            promptInput.value = ''; // Kosongkan input
            // =====================================
        }
    });
});