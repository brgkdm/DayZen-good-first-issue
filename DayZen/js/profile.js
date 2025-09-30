document.addEventListener('DOMContentLoaded', function() {
    
    const photoUpload = document.getElementById('photo-upload');
    const profileImg = document.getElementById('profile-img');
    const imageContainer = document.querySelector('.image-container');
    
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                showToast('Please upload a valid image (JPG, PNG, or GIF)', 'error');
                return;
            }
            
            const maxSize = 5 * 1024 * 1024; 
            if (file.size > maxSize) {
                showToast('File size must be less than 5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                
                profileImg.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    profileImg.style.transform = 'scale(1)';
                }, 300);
                
                showToast('Profile photo uploaded successfully!', 'success');
                updateProgress();
            }
            reader.readAsDataURL(file);
        }
    });

    if (imageContainer) {
        imageContainer.addEventListener('click', function() {
            photoUpload.click();
        });
    }

    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            document.querySelector('.container').style.animation = 'fadeOutDown 0.5s ease-out';
            setTimeout(() => {
                window.location.href = "indexacc.html";
            }, 400);
        });
    }

    const bioTextarea = document.getElementById('bio');
    const charCounter = document.querySelector('.char-counter');
    
    if (bioTextarea && charCounter) {
        bioTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 500;
            
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#e74c3c';
            } else if (currentLength > maxLength * 0.7) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = '#999';
            }
            
            updateProgress();
        });
    }

    const preferenceItems = document.querySelectorAll('.preference-item');
    preferenceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                createRipple(e, this);
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                updateProgress();
            }
        });

        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                updateProgress();
            });
        }
    });

    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                const label = this.querySelector('label');
                label.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    label.style.transform = '';
                }, 200);
                
                updateProgress();
            }
        });

        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', function() {
                updateProgress();
            });
        }
    });

    const timeItems = document.querySelectorAll('.time-item');
    timeItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                const label = this.querySelector('label');
                label.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    label.style.transform = '';
                }, 200);
                
                updateProgress();
            }
        });

        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', function() {
                updateProgress();
            });
        }
    });

    const fitnessGoal = document.getElementById('fitness-goal');
    if (fitnessGoal) {
        fitnessGoal.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#333';
                showToast(`Great choice! ${this.options[this.selectedIndex].text}`, 'info');
            }
            updateProgress();
        });
    }

    const availabilitySlider = document.getElementById('availability');
    if (availabilitySlider) {
        const valueDisplay = document.createElement('div');
        valueDisplay.className = 'slider-value-display';
        valueDisplay.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 100;
        `;
        document.body.appendChild(valueDisplay);

        availabilitySlider.addEventListener('input', function(e) {
            const value = this.value;
            const rect = this.getBoundingClientRect();
            const percentage = ((value - this.min) / (this.max - this.min)) * 100;
            
            valueDisplay.style.left = `${rect.left + (rect.width * percentage / 100) - 30}px`;
            valueDisplay.style.top = `${rect.top - 50}px`;
            valueDisplay.textContent = `${value} day${value > 1 ? 's' : ''}`;
            valueDisplay.style.opacity = '1';
            
            updateProgress();
        });

        availabilitySlider.addEventListener('mouseleave', function() {
            valueDisplay.style.opacity = '0';
        });

        availabilitySlider.addEventListener('change', function() {
            setTimeout(() => {
                valueDisplay.style.opacity = '0';
            }, 1000);
        });
    }

    function updateProgress() {
        let progress = 0;
        let completedSteps = [];
        
        if (profileImg && profileImg.src && !profileImg.src.includes('user.png')) {
            progress += 15;
            completedSteps.push('Profile Photo');
        }
        
        if (bioTextarea && bioTextarea.value.trim().length > 0) {
            progress += 15;
            completedSteps.push('Bio');
        }
        
        const checkedPreferences = document.querySelectorAll('input[name="preferences"]:checked');
        if (checkedPreferences.length > 0) {
            progress += 20;
            completedSteps.push('Fitness Preferences');
        }
        
        if (fitnessGoal && fitnessGoal.value !== '') {
            progress += 15;
            completedSteps.push('Fitness Goal');
        }
        
        const checkedExperience = document.querySelector('input[name="experience"]:checked');
        if (checkedExperience) {
            progress += 15;
            completedSteps.push('Experience Level');
        }
        
        if (availabilitySlider && availabilitySlider.value) {
            progress += 10;
            completedSteps.push('Availability');
        }
        
        const checkedTime = document.querySelector('input[name="time"]:checked');
        if (checkedTime) {
            progress += 10;
            completedSteps.push('Workout Time');
        }
        
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressPercent) {
            progressPercent.textContent = progress;
        }
        
        try {
            localStorage.setItem('profileProgress', progress);
            localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
        } catch (e) {
            console.log('LocalStorage not available');
        }
        
        return progress;
    }

    const profileForm = document.querySelector('.profile-section');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let errors = [];
            
            const checkedPreferences = document.querySelectorAll('input[name="preferences"]:checked');
            if (checkedPreferences.length === 0) {
                errors.push('Please select at least one fitness preference');
            }
            
            if (!fitnessGoal || fitnessGoal.value === '') {
                errors.push('Please select your primary fitness goal');
            }
            
            const checkedExperience = document.querySelector('input[name="experience"]:checked');
            if (!checkedExperience) {
                errors.push('Please select your experience level');
            }
            
            const checkedTime = document.querySelector('input[name="time"]:checked');
            if (!checkedTime) {
                errors.push('Please select your preferred workout time');
            }
            
            if (errors.length > 0) {
                showToast(errors[0], 'error');
                
                profileForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    profileForm.style.animation = '';
                }, 500);
            } else {
                const submitBtn = profileForm.querySelector('.primary-cta');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
                submitBtn.style.opacity = '0.7';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
                    submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
                    
                    showToast('Profile saved successfully! 🎉', 'success');
                    
                    saveProfileData();
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.background = '';
                    }, 2000);
                }, 1500);
            }
        });
    }

    function saveProfileData() {
        const profileData = {
            bio: bioTextarea ? bioTextarea.value : '',
            preferences: Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(cb => cb.id),
            fitnessGoal: fitnessGoal ? fitnessGoal.value : '',
            experience: document.querySelector('input[name="experience"]:checked')?.value || '',
            availability: availabilitySlider ? availabilitySlider.value : '',
            timePreference: document.querySelector('input[name="time"]:checked')?.value || '',
            timestamp: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('dayzenProfile', JSON.stringify(profileData));
            console.log('Profile data saved:', profileData);
        } catch (e) {
            console.log('Could not save profile data');
        }
    }

    function showToast(message, type = 'info') {
        const existingToast = document.getElementById('toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = `toast ${type}`;
        
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'error') icon = 'fa-circle-xmark';
        if (type === 'warning') icon = 'fa-triangle-exclamation';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#667eea'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.4s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes fadeOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(40px);
            }
        }
    `;
    document.head.appendChild(style);

    updateProgress();
    
    setTimeout(() => {
        showToast('Welcome! Complete your profile to get started 🚀', 'info');
    }, 500);

    console.log('✅ DayZen Profile Enhanced JavaScript Loaded Successfully!');
});
