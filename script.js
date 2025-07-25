//your JS code here. If required.
const codeInputs = document.querySelectorAll('.code');
        
        // Focus the first input on page load
        window.addEventListener('load', () => {
            codeInputs[0].focus();
        });

        codeInputs.forEach((input, index) => {
            // Handle input event (typing forward)
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Only allow numeric input
                if (!/^\d$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                // Move to next input if current is filled and not the last input
                if (value && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });

            // Handle keydown event (backspace behavior)
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    // If current field has content, clear it
                    if (input.value) {
                        input.value = '';
                    } 
                    // If current field is empty and not the first input, move to previous
                    else if (index > 0) {
                        codeInputs[index - 1].focus();
                        codeInputs[index - 1].value = '';
                    }
                }
                
                // Handle arrow key navigation
                if (e.key === 'ArrowLeft' && index > 0) {
                    codeInputs[index - 1].focus();
                }
                if (e.key === 'ArrowRight' && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });

            // Handle paste event
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text');
                const digits = pastedData.replace(/\D/g, '').slice(0, 6);
                
                digits.split('').forEach((digit, i) => {
                    if (index + i < codeInputs.length) {
                        codeInputs[index + i].value = digit;
                    }
                });
                
                // Focus the next empty input or the last input
                const nextIndex = Math.min(index + digits.length, codeInputs.length - 1);
                codeInputs[nextIndex].focus();
            });

            // Handle focus event to select all text
            input.addEventListener('focus', (e) => {
                e.target.select();
            });
        });

        function verifyCode() {
            const code = Array.from(codeInputs).map(input => input.value).join('');
            
            if (code.length !== 6) {
                alert('Please enter all 6 digits of the verification code.');
                return;
            }
            
            if (!/^\d{6}$/.test(code)) {
                alert('Please enter only numeric digits.');
                return;
            }
            
            // Simulate verification process
            console.log('Verifying code:', code);
            alert(`Verification code ${code} submitted successfully!`);
            
            // Here you would typically send the code to your backend
            // fetch('/verify-otp', { method: 'POST', body: JSON.stringify({ code }) })
        }

        function resendCode() {
            // Clear all inputs
            codeInputs.forEach(input => input.value = '');
            codeInputs[0].focus();
            
            // Simulate resend process
            console.log('Resending verification code...');
            alert('A new verification code has been sent to your email address.');
            
            // Here you would typically call your backend to resend the code
            // fetch('/resend-otp', { method: 'POST' })
        }