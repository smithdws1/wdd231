/* General Styles */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

h1, h2 {
    font-family: 'Merriweather', serif;
    color: #2c3e50;
}

header, footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 1rem;
}

header h1 {
    margin: 0;
    font-size: 1.8rem;
}

/* Navigation */
nav {
    margin-top: 1rem;
}

#menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

#nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

#nav-menu li a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
}

#nav-menu li a:hover, #nav-menu li a.active {
    background-color: #3498db;
    border-radius: 5px;
}

/* Main Content */
main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.view-toggle {
    text-align: right;
    margin-bottom: 1rem;
}

.view-toggle button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.view-toggle button.active {
    background-color: #2c3e50;
}

/* Grid View */
#member-container.grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

#member-container.grid-view .member-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#member-container.grid-view .member-card img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
}

#member-container.grid-view .member-card h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: #2c3e50;
}

#member-container.grid-view .member-card p {
    margin: 0.3rem 0;
    color: #666;
}

/* List View */
#member-container.list-view {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

#member-container.list-view .member-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

#member-container.list-view .member-card img {
    display: none;
}

#member-container.list-view .member-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: #2c3e50;
}

#member-container.list-view .member-card p {
    margin: 0.2rem 0;
    color: #666;
}

/* Footer */
footer p {
    margin: 0.5rem 0;
}

footer .flag {
    vertical-align: middle;
    width: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    #menu-toggle {
        display: block;
    }

    #nav-menu {
        display: none;
        flex-direction: column;
        text-align: center;
    }

    #nav-menu.active {
        display: flex;
    }

    #nav-menu li a {
        padding: 1rem;
    }

    .view-toggle {
        text-align: center;
    }
}

@media (max-width: 320px) {
    header h1 {
        font-size: 1.5rem;
    }

    #member-container.grid-view {
        grid-template-columns: 1fr;
    }
}