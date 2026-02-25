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
                    ${project.github ? `
                    <a href="${project.github}" class="action-btn primary" target="_blank" onclick="event.stopPropagation()">
                        <i class="fab fa-github"></i> GitHub
                    </a>` : ''}
                    ${project.demo ? `
                    <a href="${project.demo}" class="action-btn secondary" target="_blank" onclick="event.stopPropagation()">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` : ''}
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

    const dummyPosts = [
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "Saint Peter's University",
            title: "SPU Ambassador 🎓",
            description: "Honored to be announced as an official Ambassador for Saint Peter's University — representing the university's mission in research, leadership, and data science.",
            image: "assets/images/ambassador_announcement.png",
            hashtags: ["Ambassador", "Leadership", "DataScience", "SPU"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7337945622408290307/"
        },
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "Data Storyteller Award 2024 🏆",
            title: "Live Healthcare Data Pipeline",
            description: "Won the Data Storyteller Award for a real-time healthcare pipeline on AWS — processing 200GB+ daily claims with 99.5% uptime and CloudWatch-powered alerting.",
            image: "assets/images/Data StoryTeller Award.png",
            hashtags: ["AWS", "DataEngineering", "ETL", "Healthcare", "Tableau"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7246560421753536515/"
        },  
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "1st Prize · Data Science Showcase 2024 🥇",
            title: "AQI Routing for Respiratory Patients",
            description: "Built a least-polluted routing algorithm using Azure Maps and live AQI data — validated across the world's most polluted cities. Won 1st Prize at SPU's Data Science Showcase.",
            image: "assets/images/Data Science Showcase Winner.png",
            hashtags: ["AzureMaps", "GeoSpatial", "AQI", "HealthTech", "Python"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7270277314288967680/"
        },
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "NJBDA 2025 Conference 🎤",
            title: "Presented 2 Research Papers at NJBDA",
            description: "Led two teams to present research at the NJ Big Data Alliance 2025 — covering real-time NLP news pipelines and cloud-native AQI routing. Both papers under peer review.",
            image: "assets/images/NJBDA conference.png",
            hashtags: ["NLP", "BigData", "Research", "DataEngineering", "NJBDA2025"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7330083180433002496/"
        },
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "Founder & President 👨‍💻",
            title: "Data Science Club at SPU",
            description: "Founded and led SPU's 50+ member Data Science Club — organizing research events, workshops, and projects that connected students with real-world data challenges.",
            image: "assets/images/Data Science Club President.png",
            hashtags: ["Leadership", "DataScience", "ClubFounder", "CommunityBuilding"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7318006071007088640/"
        },
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "SPU Symposium 2024 & 2025 🔬",
            title: "Research at SPU Symposiums",
            description: "Presented hybrid metaheuristic optimization for breast cancer diagnostics (+15% accuracy) and an NLP pipeline processing 10K+ daily news articles at SPU Symposiums.",
            image: "assets/images/Symposiums.png",
            hashtags: ["NLP", "MetaheuristicAlgorithms", "MachineLearning", "HealthcareAI"],
            cta: "https://www.linkedin.com/feed/update/urn:li:activity:7323804099462762496/"
        },
        {
            profile: "assets/images/ajay.png",
            username: "Ajay Raj Singh",
            tag: "Top 1% · Commencement 2025 ✨",
            title: "Alpha Sigma Nu Honor Society",
            description: "Inducted into Alpha Sigma Nu — the National Jesuit Honor Society — for placing in the top 1% of the class with a 3.95 GPA, recognized for academics, leadership, and service.",
            image: "assets/images/alpha sigma nu.png",
            hashtags: ["AlphaSigmaNu", "HonorSociety", "AcademicExcellence", "Top1Percent"],
            cta: "https://www.linkedin.com/in/connectwithajayrajsingh/details/honors/"
        }
    ];

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
                <i class="fab fa-linkedin insta-menu" style="color:#0077b5;font-size:1.2rem;"></i>
            </div>
            <div class="insta-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="insta-body">
                <h3 class="insta-title">${post.title}</h3>
                <p class="insta-description">${post.description}</p>
                <div class="insta-hashtags">
                    ${post.hashtags.map(tag => `<span class="insta-hash">#${tag}</span>`).join("")}
                </div>
                <a href="${post.cta}" class="insta-cta" target="_blank">
                    <i class="fab fa-linkedin"></i> View on LinkedIn →
                </a>
            </div>
        `;

        track.appendChild(card);

        const dot = document.createElement("span");
        dot.className = "insta-dot" + (index === 0 ? " active" : "");
        dotsContainer.appendChild(dot);
    });

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

// ================= MODALS =================

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
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-user" style="width:18px;color:var(--accent,#4f8ef7);"></i>
                            <span><strong>Ajay Raj Singh</strong></span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-envelope" style="width:18px;color:var(--accent,#4f8ef7);"></i>
                            <a href="mailto:ajayrajsingh2003@gmail.com">ajayrajsingh2003@gmail.com</a>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-phone" style="width:18px;color:var(--accent,#4f8ef7);"></i>
                            <span>+1 (732) 209-0281</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-map-marker-alt" style="width:18px;color:var(--accent,#4f8ef7);"></i>
                            <span>Jersey City, New Jersey, United States</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fab fa-linkedin" style="width:18px;color:#0077b5;"></i>
                            <a href="https://linkedin.com/in/connectwithajayrajsingh" target="_blank">connectwithajayrajsingh</a>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fab fa-github" style="width:18px;color:var(--accent,#4f8ef7);"></i>
                            <a href="https://github.com/ajayrajsingh2003" target="_blank">ajayrajsingh2003</a>
                        </div>
                    </div>
                    <hr style="margin:18px 0;opacity:0.2;">
                    <p style="line-height:1.7;">Data Engineer with 6+ years of experience building production-grade pipelines across healthcare, sports analytics, and enterprise domains. Currently processing 200GB+ daily healthcare claims on AWS with 99.5% uptime at Pavane Solutions.</p>
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

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;margin-bottom:24px;">
                        <h3 style="margin:0 0 2px;">Data Engineer</h3>
                        <div style="font-weight:600;margin-bottom:2px;">Pavane Solutions Inc.</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Jul 2024 – Present &nbsp;·&nbsp; Remote, NJ</div>
                        <ul style="margin:0;padding-left:18px;line-height:1.8;">
                            <li>Engineered PySpark ETL pipelines on AWS EMR/Glue processing <strong>200GB+ daily</strong> healthcare claims into Redshift and Athena — <strong>99.5% uptime</strong></li>
                            <li>Orchestrated <strong>50+ Airflow DAGs</strong> with retry logic and SLA monitoring — <strong>40% reduction</strong> in manual intervention</li>
                            <li>Optimized PySpark jobs via broadcast joins and dynamic partitioning — <strong>35% faster</strong> processing, <strong>$1,800/month</strong> saved on AWS EMR</li>
                            <li>Migrated Oracle to Snowflake with dbt incremental ELT and star schema modeling — <strong>25% cost reduction</strong></li>
                            <li>Built data quality framework: CloudWatch alerts for schema drift, null checks, and referential integrity violations</li>
                            <li>Deployed containerized pipelines via Docker on AWS EKS with Jenkins CI/CD</li>
                            <li>Implemented IaC using Terraform — automated provisioning across dev, staging, and production</li>
                            <li>Leveraged Azure Databricks for large-scale PySpark transformations on Delta Lake with schema enforcement</li>
                            <li>Built reusable ingestion frameworks cutting new data source integration time by <strong>50%</strong></li>
                            <li>Reduced average query latency by <strong>20%</strong> through schema design and query optimization</li>
                        </ul>
                    </div>

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;margin-bottom:24px;">
                        <h3 style="margin:0 0 2px;">Data Science Researcher</h3>
                        <div style="font-weight:600;margin-bottom:2px;">Saint Peter's University</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Nov 2023 – Feb 2025 &nbsp;·&nbsp; Jersey City, NJ</div>
                        <ul style="margin:0;padding-left:18px;line-height:1.8;">
                            <li>Built least-polluted AQI routing system using Azure Maps + live AQI data — <strong>1st Prize, SPU Data Science Showcase 2024</strong></li>
                            <li>NLP pipeline ingesting <strong>10,000+ daily articles</strong> from NYT and Bing APIs with PySpark sentiment analysis</li>
                            <li>Hybrid ACO + Grid Search algorithm — <strong>+15% accuracy</strong>, <strong>-20% training time</strong> on breast cancer diagnostics</li>
                            <li>Automated Azure-based ingestion pipelines — <strong>60% reduction</strong> in data preparation time</li>
                            <li>Deployed AWS Lambda + CloudFront platform — <strong>65% reduction</strong> in content delivery latency</li>
                            <li>Presented <strong>2 research papers</strong> at NJBDA 2025 — NLP pipelines and AQI routing (both under peer review)</li>
                            <li>Utilized Azure Databricks for distributed geospatial and health data processing</li>
                            <li>Founded and led SPU Data Science Club — <strong>50+ members</strong></li>
                        </ul>
                    </div>

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;margin-bottom:24px;">
                        <h3 style="margin:0 0 2px;">Data Scientist II</h3>
                        <div style="font-weight:600;margin-bottom:2px;">IT Nopal Technologies</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Jun 2021 – Jan 2023 &nbsp;·&nbsp; New Delhi, India</div>
                        <ul style="margin:0;padding-left:18px;line-height:1.8;">
                            <li>Sports analytics pipelines processing <strong>50K+ match events weekly</strong> via REST APIs, Airflow, and AWS S3</li>
                            <li><strong>100% data integrity</strong> across ingestion layers via Python-based JSON validation</li>
                            <li>Improved ML model accuracy by <strong>20%</strong> through ensemble modeling and feature engineering</li>
                            <li>Reduced AWS costs by <strong>15%</strong> — right-sized EC2, S3 lifecycle policies, Lambda refactoring</li>
                            <li>Containerized ML workflows with Docker + GitLab CI/CD pipelines</li>
                            <li>Automated validation workflows cutting manual effort by <strong>40%</strong></li>
                        </ul>
                    </div>

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;">
                        <h3 style="margin:0 0 2px;">Data Scientist I</h3>
                        <div style="font-weight:600;margin-bottom:2px;">IT Nopal Technologies</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Jan 2019 – May 2021 &nbsp;·&nbsp; New Delhi, India</div>
                        <ul style="margin:0;padding-left:18px;line-height:1.8;">
                            <li>Migrated <strong>10M+ records</strong> MongoDB to PostgreSQL — <strong>85% faster queries</strong>, <strong>70% less EC2 cost</strong></li>
                            <li>Serverless analytics layer with AWS Lambda + API Gateway — <strong>30% performance improvement</strong></li>
                            <li>PyTorch ML models deployed as Flask APIs — <strong>82% accuracy</strong>, cut A/B test cycles by 3 days</li>
                            <li>Plotly + SQL dashboards tracking KPIs across <strong>4+ departments</strong></li>
                            <li>Automated aggregation scripts saving <strong>40%</strong> of manual data handling effort</li>
                            <li>Maintained <strong>95%+ data reliability</strong> across all production pipelines</li>
                        </ul>
                    </div>

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

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-code" style="color:var(--accent,#4f8ef7);"></i> Programming
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["Python","SQL","PL/SQL","C/C++","YAML","Bash","JSON"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-stream" style="color:var(--accent,#4f8ef7);"></i> Data Engineering & ETL
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["PySpark","Apache Spark","Apache Airflow","dbt","ETL/ELT","Data Warehousing","Star Schema Modeling","Data Partitioning","Query Optimization","S3 Event-Driven Pipelines","ELT Development"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-cloud" style="color:var(--accent,#4f8ef7);"></i> Cloud & Infrastructure
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["AWS S3","AWS EMR","AWS Glue","AWS Lambda","AWS Athena","AWS EKS","CloudWatch","CloudFront","API Gateway","Azure Data Factory","Azure Databricks","Azure Maps API","Docker","Kubernetes","Terraform"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-database" style="color:var(--accent,#4f8ef7);"></i> Databases
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["PostgreSQL","MySQL","SQL Server","MongoDB","Snowflake","Redshift","AWS RDS","Delta Lake"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-bar" style="color:var(--accent,#4f8ef7);"></i> Analytics & Visualization
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["Tableau","Power BI","Plotly","Pandas","NumPy","Scikit-learn","PyTorch","Matplotlib","Seaborn","Feature Engineering"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-brain" style="color:var(--accent,#4f8ef7);"></i> NLP & Machine Learning
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["NLP","Sentiment Analysis","Text Processing","Hugging Face Transformers","BERT","Machine Learning","Classification","Metaheuristic Algorithms","Flask APIs"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div style="margin-bottom:18px;">
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-tools" style="color:var(--accent,#4f8ef7);"></i> DevOps & CI/CD
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["Docker","Kubernetes","Jenkins","GitLab CI/CD","Git","Terraform","Infrastructure as Code","REST API Integration"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

                    <div>
                        <div style="font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-shield-alt" style="color:var(--accent,#4f8ef7);"></i> Data Quality & Monitoring
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${["AWS CloudWatch","Schema Drift Detection","Data Validation","Automated Alerting","SLA Monitoring","Referential Integrity Checks","PyODBC"].map(s => `<span style="background:var(--accent-light,#e8f0fe);color:var(--accent,#4f8ef7);border-radius:20px;padding:3px 12px;font-size:0.82rem;font-weight:600;">${s}</span>`).join("")}
                        </div>
                    </div>

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

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;margin-bottom:24px;">
                        <h3 style="margin:0 0 2px;">Master of Science in Data Science</h3>
                        <div style="font-weight:600;margin-bottom:2px;">Saint Peter's University</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Feb 2023 – Feb 2025 &nbsp;·&nbsp; Jersey City, NJ</div>
                        <p style="margin:0 0 6px;"><strong>GPA:</strong> 3.95 / 4.00</p>
                        <p style="margin:0 0 6px;"><strong>Honors:</strong> Alpha Sigma Nu Honor Society &nbsp;·&nbsp; Top 1% of class</p>
                        <p style="margin:0;"><strong>Activities:</strong> Data Science Club Founder & President &nbsp;·&nbsp; SPU Ambassador &nbsp;·&nbsp; NJBDA 2025 Presenter</p>
                    </div>

                    <div style="border-left:3px solid var(--accent,#4f8ef7);padding-left:14px;">
                        <h3 style="margin:0 0 2px;">Bachelor of Technology in Computer Science</h3>
                        <div style="font-weight:600;margin-bottom:2px;">AKTU</div>
                        <div style="font-size:0.85rem;opacity:0.7;margin-bottom:10px;">Aug 2016 – Aug 2020 &nbsp;·&nbsp; India</div>
                        <p style="margin:0;"><strong>GPA:</strong> 3.57 / 4.00</p>
                    </div>

                </div>
            </div>
        </div>
    `;

    // Awards Modal
    container.innerHTML += `
        <div id="awardsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeModal('awardsModal')">&times;</button>
                    <h2>Honors & Awards</h2>
                </div>
                <div class="modal-body awards-grid">

                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7337945622408290307/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/ambassador_announcement.png" alt="SPU Ambassador">
                        <h4>Ambassador of Saint Peter's University</h4>
                        <p>Jul 2025 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7318006071007088640/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/Data Science Club President.png" alt="Data Science Club">
                        <h4>Data Science Club Founder & President</h4>
                        <p>Apr 2025 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7270277314288967680/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/Data Science Showcase Winner.png" alt="Data Science Showcase">
                        <h4>1st Place — Data Science Showcase</h4>
                        <p>Dec 2024 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

                    <a href="https://www.linkedin.com/in/connectwithajayrajsingh/details/honors/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/alpha sigma nu.png" alt="Alpha Sigma Nu">
                        <h4>Alpha Sigma Nu Honor Society</h4>
                        <p>Nov 2024 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7246560421753536515/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/Data StoryTeller Award.png" alt="Data Storyteller">
                        <h4>Data Storyteller Award</h4>
                        <p>2024 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7330083180433002496/" target="_blank" class="award-card" style="text-decoration:none;display:block;cursor:pointer;">
                        <img src="assets/images/NJBDA conference.png" alt="NJBDA">
                        <h4>NJBDA 2025 Research Presenter</h4>
                        <p>2025 &nbsp;·&nbsp; <span style="color:var(--accent,#4f8ef7);">LinkedIn →</span></p>
                    </a>

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

// ================= TABS =================

function showTab(tabName) {
    document.getElementById('projects-content').style.display = 'none';
    document.getElementById('experience-content').style.display = 'none';
    document.getElementById('about-content').style.display = 'none';
    document.getElementById('tags-content').style.display = 'none';

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

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

// ================= MODALS OPEN/CLOSE =================

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

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ================= INIT =================

document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.post, .experience-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
});