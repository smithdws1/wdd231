document.addEventListener("DOMContentLoaded", () => {
    // Course array from the assignment
    let courses = [
        { code: "CSE 110", name: "Introduction to Programming", credits: 3, completed: false },
        { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: false },
        { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: false },
        { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false },
        { code: "WDD 131", name: "Dynamic Web Development", credits: 2, completed: false },
        { code: "WDD 231", name: "Advanced Web Development", credits: 3, completed: false }
    ];

    // Show completed status
    courses[0].completed = true;
    courses[1].completed = true;
    courses[4].completed = true;

    const courseList = document.querySelector(".course-list");
    const buttons = document.querySelectorAll(".course-buttons button");
    const creditsDisplay = document.createElement("p");
    creditsDisplay.id = "credits-display";
    document.querySelector(".certificate").appendChild(creditsDisplay);

    // Function to display courses
    function displayCourses(filter = "all") {
        courseList.innerHTML = "";
        let filteredCourses = courses;

        if (filter !== "all") {
            filteredCourses = courses.filter(course => course.code.startsWith(filter));
        }

        filteredCourses.forEach(course => {
            const li = document.createElement("li");
            li.className = `course ${course.code.split(" ")[0].toLowerCase()}`;
            li.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
            if (course.completed) {
                li.style.backgroundColor = "#E0F7FA";
                li.style.borderLeft = "4px solid #2E7D32";
            } else {
                li.style.backgroundColor = "#F5F5F5";
                li.style.borderLeft = "4px solid #D32F2F";
            }
            courseList.appendChild(li);
        });

        // Calculate total credits
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    }

    // Event listener for filter buttons
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.textContent === "All" ? "all" : button.textContent;
            displayCourses(filter);
        });
    });

    displayCourses("all");
});