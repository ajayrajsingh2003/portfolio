// Load all data and initialize portfolio
async function loadPortfolioData() {
    try {
        const [projects, experience, skills] = await Promise.all([
            fetch('data/projects.json').then(r => r.json()),
            fetch('data/experience.json').then(r => r.json()),
            fetch('data/skills.json').then(r => r.json())
        ]);
        
        renderProjects(projects);
        renderExperience(experience);
        renderSkills(skills);
        renderModals(projects);
        renderTags(); 
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Render projects grid
function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'post';
        projectCard.onclick = () => openModal(`project${project.id}Modal`);
        
        projectCard.innerHTML = `
            <div class="post-header">
                <i class="fas fa-${project.icon}"></i>
            </div>
            <div class="post-content">
                <h3 class="post-title">${project.title}</h3>
                <p class="post-description">${project.description}</p>
                <div class="post-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="post-actions">
                    <a href="${project.github}" class="action-btn primary" target="_blank" onclick="event.stopPropagation()">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo || '#'}" class="action-btn secondary" onclick="event.stopPropagation()">
                        <i class="fas fa-external-link-alt"></i> ${project.demo ? 'Demo' : 'Learn More'}
                    </a>
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// Render experience section
function renderExperience(experiences) {
    const container = document.getElementById('experience-container');
    
    experiences.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.className = 'experience-card';
        
        expCard.innerHTML = `
            <div class="experience-header">
                <div class="company-logo">${exp.logo}</div>
                <div class="experience-info">
                    <h3>${exp.position} - ${exp.company}</h3>
                    <div class="experience-meta">${exp.location} | ${exp.duration}</div>
                </div>
            </div>
            <ul class="experience-achievements">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        
        container.appendChild(expCard);
    });
}

// Render skills section
function renderSkills(skillCategories) {
    const container = document.getElementById('skills-grid');
    
    skillCategories.forEach(category => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';
        
        skillCard.innerHTML = `
            <h4><i class="fas fa-${category.icon}"></i> ${category.category}</h4>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(skillCard);
    });
}

// ================= TAGS SECTION =================

function renderTags() {
    console.log("renderTags initialized");
    const container = document.getElementById('tags-feed');
    if (!container) return;

    // Reset container
    container.innerHTML = `
        <div class="insta-carousel">
            <div class="insta-track"></div>
            <button class="insta-nav insta-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="insta-nav insta-next"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="insta-dots"></div>
    `;

    const track = container.querySelector(".insta-track");
    const dotsContainer = container.querySelector(".insta-dots");

    // Dummy posts
const posts = [
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "Saint Peter's University",
        title: "SPU Ambassador",
        description: "Honored to be announced as an official Ambassador for Saint Peter's University, representing the university's mission in research, leadership, and data science.",
        image: "assets/images/ambassador_announcement.png",
        hashtags: ["Ambassador", "Leadership", "DataScience", "SPU"],
        cta: "https://www.linkedin.com/feed/update/urn:li:activity:7337945622408290307/"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "Data Storyteller Award 2024",
        title: "Live Healthcare Data Pipeline Analytics",
        description: "Won the Data Storyteller Award for building a real-time healthcare data pipeline on AWS. Currently presented on Tableau",
        image: "assets/images/placeholder.png",
        hashtags: ["AWS", "DataEngineering", "ETL", "Healthcare", "Tableau"],
        cta: "https://www.linkedin.com/feed/update/urn:li:activity:7246560421753536515/"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "Data Science Showcase 2024 — 1st Prize",
        title: "Safest Routes for Sensitive Populations (AQI Routing)",
        description: "Won 1st Prize at SPU's Data Science Showcase for engineering a least-polluted routing algorithm using Azure Maps API and live Air Quality Index data, validated across the world's most polluted cities.",
        image: "assets/images/placeholder.png",
        hashtags: ["Python", "AzureMaps", "AQI", "GeoSpatial", "PublicHealth"],
        cta: "https://www.linkedin.com/feed/update/urn:li:activity:7270277314288967680/"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "NJBDA 2025 Conference",
        title: "Presented 2 Research Papers at NJBDA 2025",
        description: "Led two teams to present research at the NJ Big Data Alliance 2025 Conference, covering real-time NLP news retrieval pipelines and cloud-native AQI routing systems. Both papers are currently under review.",
        image: "assets/images/placeholder.png",
        hashtags: ["NLP", "DataEngineering", "Research", "BigData", "NJBDA"],
        cta: "https://www.linkedin.com/feed/update/urn:li:activity:7330083180433002496/"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "Founder & President",
        title: "President of Data Science Club at SPU",
        description: "Founded and led SPU's 50+ member Data Science Club, organizing research events, workshops, and collaborative projects that connected students with faculty and real-world data challenges.",
        image: "assets/images/placeholder.png",
        hashtags: ["Leadership", "DataScience", "ClubPresident", "CommunityBuilding"],
        cta: "https://www.linkedin.com/in/connectwithajayrajsingh/details/honors/725167849/multiple-media-viewer/?profileId=ACoAAB-XSW0Bns3c7TYwxTOwLSsYF9R8HDTlIUA&treasuryMediaId=1760643167209"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "SPU Symposium 2024 & 2025",
        title: "Research Presented at SPU Symposiums",
        description: "Presented two research projects at Saint Peter's University Symposiums, a hybrid Ant Colony Optimization + Grid Search framework improving breast cancer diagnostic accuracy by 15%, and an NLP pipeline processing 10K+ daily news articles.",
        image: "assets/images/placeholder.png",
        hashtags: ["NLP", "MetaheuristicAlgorithms", "MachineLearning", "Research", "Python"],
        cta: "https://www.linkedin.com/in/connectwithajayrajsingh/details/honors/1551450604/multiple-media-viewer/?profileId=ACoAAB-XSW0Bns3c7TYwxTOwLSsYF9R8HDTlIUA&treasuryMediaId=1766783009453"
    },
    {
        profile: "assets/images/ajay.png",
        username: "Ajay Raj Singh",
        tag: "Top 1% of Class — Commencement 2025",
        title: "Inducted into Alpha Sigma Nu Honor Society",
        description: "Selected for Alpha Sigma Nu, the National Jesuit Honor Society, for placing in the top 1% of the class — recognizing excellence in academics (GPA 3.95/4.0), leadership, and service.",
        image: "assets/images/placeholder.png",
        hashtags: ["HonorSociety", "AlphaSigmaNu", "AcademicExcellence", "Leadership"],
        cta: "https://www.linkedin.com/in/connectwithajayrajsingh/details/honors/1079808237/multiple-media-viewer/?profileId=ACoAAB-XSW0Bns3c7TYwxTOwLSsYF9R8HDTlIUA&treasuryMediaId=1757365333033"
    }
];

    // Render each card
    dummyPosts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "insta-card";

        card.innerHTML = `
            <div class="insta-header">
                <img src="${post.profile}" alt="${post.username}" class="insta-profile">
                <div class="insta-info">
                    <span class="insta-username">${post.username}</span>
                    <span class="insta-tag">${post.tag}</span>
                </div>
                <i class="fas fa-ellipsis-h insta-menu"></i>
            </div>
            <div class="insta-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="insta-body">
                <h3 class="insta-title">${post.title}</h3>
                <p class="insta-description">${post.description}</p>
                <div class="insta-hashtags">
                    ${post.hashtags.map(tag => `<span>#${tag}</span>`).join(" ")}
                </div>
                <a href="${post.cta}" class="insta-cta" target="_blank">Learn More →</a>
            </div>
        `;

        track.appendChild(card);

        // Add dots
        const dot = document.createElement("span");
        dot.className = "insta-dot" + (index === 0 ? " active" : "");
        dotsContainer.appendChild(dot);
    });

    // Carousel logic
    let currentIndex = 0;
    const cards = track.querySelectorAll(".insta-card");
    const dots = dotsContainer.querySelectorAll(".insta-dot");

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => dot.classList.toggle("active", idx === currentIndex));
    }

    container.querySelector(".insta-next").onclick = () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    };
    container.querySelector(".insta-prev").onclick = () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    };
    dots.forEach((dot, idx) => {
        dot.onclick = () => {
            currentIndex = idx;
            updateCarousel();
        };
    });

    updateCarousel();
}

// Render all modals
function renderModals(projects) {
    const container = document.getElementById('modals-container');
    
    // About Modal
    container.innerHTML += `
        <div id="aboutModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeModal('aboutModal')">&times;</button>
                    <h2>Contact Information</h2>
                </div>
                <div class="modal-body">
                    <p><strong>Name:</strong> Ajay Raj Singh</p>
                    <p><strong>Email:</strong> ajayrajsingh2003@gmail.com</p>
                    <p><strong>Phone:</strong> +1 (732) 209-0281</p>
                    <p><strong>Location:</strong> Jersey City, New Jersey, United States</p>
                    <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/connectwithajayrajsingh" target="_blank">connectwithajayrajsingh</a></p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/ajayrajsingh2003" target="_blank">ajayrajsingh2003</a></p>
                    <br>
                    <p>Data Engineer with 6+ years of experience in building scalable data solutions, ETL pipelines, and cloud-based data infrastructure.</p>
                </div>
            </div>
        </div>
    `;
    
    // Experience Modal
    container.innerHTML += `
        <div id="experienceModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeModal('experienceModal')">&times;</button>
                    <h2>Professional Experience</h2>
                </div>
                <div class="modal-body">
                    <h3>Current: Data Engineer at Pavane Solutions Inc.</h3>
                    <p><em>Jun 2024 – Present | Remote, NJ</em></p>
                    <ul>
                        <li>35% improvement in data processing throughput</li>
                        <li>40% reduction in manual errors</li>
                        <li>25% reduction in operational costs</li>
                    </ul>
                    <h3>Data Science Researcher at Saint Peter's University</h3>
                    <p><em>Nov 2023 – Feb 2025 | Jersey City, NJ</em></p>
                    <ul>
                        <li>Presented 2 research projects at NJBDA 2025</li>
                        <li>15% accuracy improvement with hybrid algorithms</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Skills Modal
    container.innerHTML += `
        <div id="skillsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeModal('skillsModal')">&times;</button>
                    <h2>Technical Skills</h2>
                </div>
                <div class="modal-body">
                    <h3>Programming:</h3>
                    <p>Python, SQL, PL/SQL, C/C++, YAML</p>
                    <h3>Big Data & ETL:</h3>
                    <p>PySpark, Apache Airflow, Apache Kafka, AWS Glue, Azure Data Factory</p>
                    <h3>Cloud Platforms:</h3>
                    <p>AWS, Azure, Snowflake</p>
                    <h3>Databases:</h3>
                    <p>PostgreSQL, MySQL, SQL Server, MongoDB</p>
                </div>
            </div>
        </div>
    `;
    
    // Education Modal
    container.innerHTML += `
        <div id="educationModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeModal('educationModal')">&times;</button>
                    <h2>Education</h2>
                </div>
                <div class="modal-body">
                    <h3>Master of Science in Data Science</h3>
                    <p><strong>Saint Peter's University</strong></p>
                    <p>Feb 2023 – Feb 2025 | Jersey City, NJ</p>
                    <p><strong>GPA:</strong> 3.95/4.00</p>
                    <br>
                    <h3>Bachelor of Technology in Computer Science</h3>
                    <p><strong>AKTU</strong></p>
                    <p>Aug 2016 – Aug 2020 | India</p>
                    <p><strong>GPA:</strong> 3.57/4.00</p>
                </div>
            </div>
        </div>
    `;
    
    // Awards Modal
    // Awards Modal with Cards
container.innerHTML += `
    <div id="awardsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-modal" onclick="closeModal('awardsModal')">&times;</button>
                <h2>Honors & Awards</h2>
            </div>
            <div class="modal-body awards-grid">
                <div class="award-card">
                    <img src="assets/images/award-ambassador.png" alt="Ambassador Award">
                    <h4><a href="https://www.saintpeters.edu/" target="_blank">Ambassador of Saint Peter's University</a></h4>
                    <p>Jul 2025</p>
                </div>
                <div class="award-card">
                    <img src="assets/images/award-dsc.png" alt="Data Science Club">
                    <h4><a href="https://www.saintpeters.edu/" target="_blank">Data Science Club President</a></h4>
                    <p>Apr 2025</p>
                </div>
                <div class="award-card">
                    <img src="assets/images/award-showcase.png" alt="Data Science Showcase">
                    <h4><a href="https://njbda.org/" target="_blank">First Place - Data Science Showcase</a></h4>
                    <p>Dec 2024</p>
                </div>
                <div class="award-card">
                    <img src="assets/images/award-alpha.png" alt="Alpha Sigma Nu">
                    <h4><a href="https://www.alphasigmanu.org/" target="_blank">Alpha Sigma Nu Honor Society</a></h4>
                    <p>Nov 2024</p>
                </div>
                <div class="award-card">
                    <img src="assets/images/award-ds.png" alt="Data Storyteller">
                    <h4><a href="https://www.tableau.com/" target="_blank">Data Storyteller Award</a></h4>
                    <p>2024</p>
                </div>
                <div class="award-card">
                    <img src="assets/images/award-njbda.png" alt="NJBDA">
                    <h4><a href="https://njbda.org/" target="_blank">NJBDA Research Presenter</a></h4>
                    <p>2025</p>
                </div>
            </div>
        </div>
    </div>
`;
    
    // Project Modals
    projects.forEach(project => {
        container.innerHTML += `
            <div id="project${project.id}Modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close-modal" onclick="closeModal('project${project.id}Modal')">&times;</button>
                        <h2>${project.title}</h2>
                    </div>
                    <div class="modal-body">
                        ${project.modalContent || `
                            <p><strong>Technologies:</strong> ${project.tags.join(', ')}</p>
                            <p><strong>GitHub:</strong> <a href="${project.github}" target="_blank">${project.github}</a></p>
                            <br>
                            <p>${project.fullDescription || project.description}</p>
                        `}
                    </div>
                </div>
            </div>
        `;
    });
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all content sections
    document.getElementById('projects-content').style.display = 'none';
    document.getElementById('experience-content').style.display = 'none';
    document.getElementById('about-content').style.display = 'none';
    document.getElementById('tags-content').style.display = 'none';  // 🔥 add this line

    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    // Show selected content and activate tab
    if (tabName === 'projects') {
        document.getElementById('projects-content').style.display = 'block';
        document.querySelectorAll('.tab')[2].classList.add('active');
    } else if (tabName === 'experience') {
        document.getElementById('experience-content').style.display = 'block';
        document.querySelectorAll('.tab')[1].classList.add('active');
    } else if (tabName === 'about') {
        document.getElementById('about-content').style.display = 'block';
        document.querySelectorAll('.tab')[0].classList.add('active');
    } else if (tabName === 'tags') {
        document.getElementById('tags-content').style.display = 'block';
        document.querySelectorAll('.tab')[3].classList.add('active');
    }
}

// Modal open/close functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    
    // Setup intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements after a short delay to ensure they're rendered
    setTimeout(() => {
        document.querySelectorAll('.post, .experience-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
});