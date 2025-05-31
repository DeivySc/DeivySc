document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href'); // Get href value (e.g., "#projects")
            
            // Check if targetId is just "#" or empty, and if so, scroll to top
            if (targetId === "#" || !targetId) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            try {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn(`Smooth scroll target not found for ID: ${targetId}`);
                }
            } catch (e) {
                // Fallback for browsers that might not support querySelector with just hash or have other issues
                // Or if targetId is not a valid selector for some reason (though hrefs should be simple IDs)
                console.error(`Error finding or scrolling to target section: ${targetId}`, e);
                // As a fallback, try to navigate using the hash directly if smooth scroll fails.
                // window.location.hash = targetId; // This might be jumpy, but better than nothing.
            }
        });
    });

    // Existing GitHub Projects functionality
    const projectsSection = document.getElementById('projects');
    const GITHUB_USERNAME = 'DeivySc';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    if (!projectsSection) {
        console.error('Error: Projects section not found in the DOM.');
        return;
    }

    // Clear any existing content (e.g., placeholder text)
    // and add the main "Projects" heading if it's not already there or part of a template
    // For this task, assuming the H2 is already in index.html, we'll just clear potential old project listings.
    const existingProjectsContainer = projectsSection.querySelector('#projects-container');
    if (existingProjectsContainer) {
        existingProjectsContainer.innerHTML = ''; // Clear previous projects if any
    } else {
        // Create a container for projects if it doesn't exist, to keep things tidy
        const newProjectsContainer = document.createElement('div');
        newProjectsContainer.id = 'projects-container';
        projectsSection.appendChild(newProjectsContainer);
    }
    
    const projectsContainer = projectsSection.querySelector('#projects-container') || projectsSection;


    fetch(GITHUB_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            if (repos.length === 0) {
                const noProjectsMessage = document.createElement('p');
                noProjectsMessage.textContent = 'No public projects found for this user.';
                noProjectsMessage.style.textAlign = 'center'; // Basic styling
                projectsContainer.appendChild(noProjectsMessage);
                return;
            }

            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card'; // For potential future styling

                // Project Name
                const projectName = document.createElement('h3');
                projectName.textContent = repo.name;

                // Project Description
                const projectDescription = document.createElement('p');
                projectDescription.textContent = repo.description || 'No description available.';

                // Project URL
                const projectLink = document.createElement('a');
                projectLink.href = repo.html_url;
                projectLink.textContent = 'View on GitHub';
                projectLink.target = '_blank'; // Open in new tab
                projectLink.rel = 'noopener noreferrer'; // Security best practice

                // Project Language
                const projectLanguage = document.createElement('p');
                projectLanguage.className = 'project-meta';
                projectLanguage.innerHTML = `<strong>Language:</strong> ${repo.language || 'N/A'}`;
                
                // Stars Count
                const projectStars = document.createElement('p');
                projectStars.className = 'project-meta';
                projectStars.innerHTML = `<strong>Stars:</strong> ${repo.stargazers_count}`;

                // Assemble the card
                projectCard.appendChild(projectName);
                projectCard.appendChild(projectDescription);
                projectCard.appendChild(projectLanguage);
                projectCard.appendChild(projectStars);
                projectCard.appendChild(projectLink);

                // Basic inline styling for the card (can be moved to CSS)
                projectCard.style.border = '2px solid #00FF00'; // Green border
                projectCard.style.padding = '15px';
                projectCard.style.marginBottom = '20px';
                projectCard.style.backgroundColor = 'rgba(30, 30, 60, 0.9)'; // Darker, slightly transparent background

                projectName.style.color = '#FFFF00'; // Yellow project name
                projectName.style.marginBottom = '10px';

                projectDescription.style.marginBottom = '10px';

                projectLink.style.color = '#00FFFF'; // Cyan link
                projectLink.style.display = 'inline-block';
                projectLink.style.marginTop = '10px';
                
                const metaElements = projectCard.querySelectorAll('.project-meta');
                metaElements.forEach(meta => {
                    meta.style.fontSize = '0.9em';
                    meta.style.color = '#CCCCCC'; // Lighter grey for meta info
                    meta.style.marginBottom = '5px';
                });


                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load projects. Please try again later.';
            errorMessage.style.color = '#FF0000'; // Red error text
            errorMessage.style.textAlign = 'center';
            projectsContainer.appendChild(errorMessage);
        });
});
