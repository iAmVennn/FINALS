        const CORRECT_EMAIL = 'admin@gmail.com';
        const CORRECT_PASSWORD = 'admin123';
        
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('signInForm');
            const emailInput = document.getElementById('floatingEmail');
            const passwordInput = document.getElementById('floatingPassword');
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            const errorText = document.getElementById('errorText');
            const successText = document.getElementById('successText');
            
            function hideMessages() {
                errorMessage.style.display = 'none';
                successMessage.style.display = 'none';
            }
            
            function showError(message) {
                hideMessages();
                errorText.textContent = message;
                errorMessage.style.display = 'block';

                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            function showSuccess(message) {
                hideMessages();
                successText.textContent = message;
                successMessage.style.display = 'block';

                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();

                hideMessages();

                if (!email || !password) {
                    showError('Please fill in all fields.');
                    form.classList.add('was-validated');
                    return;
                }

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    showError('Please enter a valid email address.');
                    form.classList.add('was-validated');
                    return;
                }

                if (password.length < 6) {
                    showError('Password must be at least 6 characters long.');
                    form.classList.add('was-validated');
                    return;
                }

                if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
                    showSuccess('Sign in successful! Welcome back.');
                    form.classList.remove('was-validated');

                    setTimeout(() => {

                        window.location.href = 'HomepageFinal.html';

                    }, 1500);
                } else {

                    if (email !== CORRECT_EMAIL) {
                        showError('Invalid email address. Please try again.');
                    } else {
                        showError('Invalid password. Please try again.');
                    }
                }
                
                form.classList.add('was-validated');
            });
            
            emailInput.addEventListener('input', hideMessages);
            passwordInput.addEventListener('input', hideMessages);
        });