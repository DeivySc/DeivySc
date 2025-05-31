import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  // Replace 'octocat' with your GitHub username when you're ready
  const githubUsername = 'octocat';

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }
        return response.json();
      })
      .then(data => {
        // Filter out forks if desired, or limit the number of repos
        const nonForkRepos = data.filter(repo => !repo.fork).slice(0, 6); // Show latest 6 non-forked repos
        setRepos(nonForkRepos);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [githubUsername]); // Re-run effect if username changes

  return (
    <motion.section
      id='projects'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>My GitHub Projects</h2>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {!error && repos.length === 0 && <p>Loading projects or no public projects found...</p>}
      <div className='projects-grid'>
        {repos.map(repo => (
          <motion.div
            key={repo.id}
            className='project-card'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3><a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a></h3>
            <p>{repo.description || 'No description available.'}</p>
            {repo.language && <p><small>Language: {repo.language}</small></p>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
