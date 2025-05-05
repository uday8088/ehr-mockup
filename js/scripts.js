// DoKrunch EHR and Benefits Enrollment Application Scripts

document.addEventListener("DOMContentLoaded", () => {
  // Initialize sidebar menu toggle
  initSidebar()

  // Initialize submenu toggles
  initSubmenus()

  // Initialize enrollment steps
  initEnrollmentSteps()

  // Initialize document analysis highlighting
  initDocumentHighlighting()

  // Initialize charts if they exist on the page
  initCharts()

  // Initialize document thumbnails
  initDocumentThumbnails()

  // Initialize panel tabs
  initPanelTabs()
})

// Sidebar Toggle Functionality
function initSidebar() {
  const menuToggle = document.querySelector(".menu-toggle")
  const sidebar = document.querySelector(".sidebar")

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }
}

// Submenu Toggle Functionality
function initSubmenus() {
  const submenuLinks = document.querySelectorAll(".has-submenu")

  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Toggle active class on parent li
      const parentLi = this.parentElement

      // If already active and clicked again, do nothing (keep it open)
      // This is because we're showing the active submenu by default
      if (!parentLi.classList.contains("active")) {
        // Remove active class from all other menu items
        const allMenuItems = document.querySelectorAll(".l1-menu > li")
        allMenuItems.forEach((item) => {
          if (item !== parentLi) {
            item.classList.remove("active")
          }
        })

        // Add active class to clicked menu item
        parentLi.classList.toggle("active")
      }
    })
  })
}

// Enrollment Steps Functionality
function initEnrollmentSteps() {
  const steps = document.querySelectorAll(".enrollment-steps .step")
  const stepContents = document.querySelectorAll(".step-content")
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")

  if (steps.length > 0) {
    // Step click functionality
    steps.forEach((step) => {
      step.addEventListener("click", () => {
        const stepId = step.getAttribute("data-step")

        // Remove active class from all steps and contents
        steps.forEach((s) => s.classList.remove("active"))
        stepContents.forEach((content) => content.classList.remove("active"))

        // Add active class to clicked step and corresponding content
        step.classList.add("active")
        document.getElementById(stepId).classList.add("active")

        // Mark previous steps as completed
        steps.forEach((s) => {
          const sIndex = Array.from(steps).indexOf(s)
          const activeIndex = Array.from(steps).indexOf(step)

          if (sIndex < activeIndex) {
            s.classList.add("completed")
          } else {
            s.classList.remove("completed")
          }
        })
      })
    })

    // Next button functionality
    if (nextButtons.length > 0) {
      nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const nextStepId = button.getAttribute("data-next")
          const nextStep = document.querySelector(`.step[data-step="${nextStepId}"]`)

          if (nextStep) {
            nextStep.click()
          }
        })
      })
    }

    // Previous button functionality
    if (prevButtons.length > 0) {
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const prevStepId = button.getAttribute("data-prev")
          const prevStep = document.querySelector(`.step[data-step="${prevStepId}"]`)

          if (prevStep) {
            prevStep.click()
          }
        })
      })
    }
  }
}

// Document Analysis Highlighting
function initDocumentHighlighting() {
  const linkedFields = document.querySelectorAll(".linked-field")

  if (linkedFields.length > 0) {
    linkedFields.forEach((field) => {
      const highlightId = field.getAttribute("data-highlight")
      const highlight = document.getElementById(highlightId)

      if (highlight) {
        // Highlight on hover
        field.addEventListener("mouseenter", () => {
          highlight.style.backgroundColor = "rgba(255, 122, 89, 0.4)"
          highlight.style.borderWidth = "3px"
        })

        field.addEventListener("mouseleave", () => {
          if (highlight.classList.contains("highlight-error")) {
            highlight.style.backgroundColor = "rgba(220, 53, 69, 0.2)"
          } else {
            highlight.style.backgroundColor = "rgba(30, 78, 122, 0.2)"
          }
          highlight.style.borderWidth = "2px"
        })
      }
    })
  }
}

// Initialize Document Thumbnails
function initDocumentThumbnails() {
  const thumbnails = document.querySelectorAll(".thumbnail")

  if (thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked thumbnail
        thumbnail.classList.add("active")

        // In a real implementation, this would load the corresponding page
        // For demo purposes, we'll just update the page indicator
        const pageIndicator = document.querySelector(".page-indicator")
        if (pageIndicator) {
          const pageNumber = thumbnail.querySelector(".thumbnail-label").textContent.replace("Page ", "")
          pageIndicator.textContent = `Page ${pageNumber} of 4`
        }
      })
    })
  }
}

// Initialize Panel Tabs
function initPanelTabs() {
  const tabButtons = document.querySelectorAll(".panel-tabs .tab-btn")

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all tab buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // In a real implementation, this would show the corresponding tab content
        // For demo purposes, we'll just log the tab name
        console.log(`Tab switched to: ${button.textContent}`)
      })
    })
  }
}

// Initialize Charts
function initCharts() {
  // Chart initialization code would go here
  // This is a placeholder for chart initialization
}

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId)

  if (!form) return false

  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("error")
      isValid = false
    } else {
      input.classList.remove("error")
    }
  })

  return isValid
}

// Document Upload Handling
function handleDocumentUpload(event) {
  // If this is triggered by a button click, show file selector
  if (event.type === "click") {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    fileInput.accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx"
    fileInput.dataset.action = "upload-document"
    fileInput.style.display = "none"

    document.body.appendChild(fileInput)
    fileInput.click()

    fileInput.addEventListener("change", handleDocumentUpload)
    return
  }

  // Handle the actual file selection
  const files = event.target.files
  if (!files || files.length === 0) return

  // Show loading state
  let uploadStatus = document.querySelector(".upload-status")
  if (!uploadStatus) {
    const statusDiv = document.createElement("div")
    statusDiv.className = "upload-status"
    statusDiv.style.marginTop = "10px"

    // Find the upload button and insert the status after it
    const uploadBtn = document.querySelector('button[onclick="handleDocumentUpload(event)"]')
    if (uploadBtn && uploadBtn.parentNode) {
      uploadBtn.parentNode.insertBefore(statusDiv, uploadBtn.nextSibling)
    } else {
      document.querySelector(".main-content").appendChild(statusDiv)
    }
    uploadStatus = document.querySelector(".upload-status")
  }

  if (uploadStatus) {
    uploadStatus.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Processing document(s)...</p>'
    uploadStatus.style.display = "block"
    uploadStatus.style.backgroundColor = "rgba(0, 123, 255, 0.1)"
    uploadStatus.style.color = "#0056b3"
    uploadStatus.style.padding = "10px"
    uploadStatus.style.borderRadius = "4px"
  }

  // In a real implementation, this would send the file to the backend for AI processing
  // For demo purposes, we'll simulate a response after a delay
  setTimeout(() => {
    if (uploadStatus) {
      uploadStatus.innerHTML = `<p><i class="fas fa-check-circle"></i> ${files.length} document(s) processed successfully!</p>`
      uploadStatus.style.color = "var(--success-color)"
      uploadStatus.style.backgroundColor = "rgba(40, 167, 69, 0.1)"

      // Add file list
      const fileList = document.createElement("ul")
      fileList.style.listStyle = "none"
      fileList.style.padding = "0"
      fileList.style.marginTop = "10px"

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileItem = document.createElement("li")
        fileItem.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name} (${formatFileSize(file.size)})`
        fileItem.style.marginBottom = "5px"
        fileList.appendChild(fileItem)
      }

      uploadStatus.appendChild(fileList)

      // Show AI Auto-Fill suggestion
      const aiPanel = document.querySelector(".ai-feedback")
      if (aiPanel) {
        aiPanel.innerHTML =
          '<p><i class="fas fa-lightbulb"></i> Documents uploaded! Click "AI Auto-Fill" to extract and populate form fields automatically.</p>'
        aiPanel.style.color = "var(--info-color)"
        aiPanel.style.backgroundColor = "rgba(23, 162, 184, 0.1)"
        aiPanel.style.padding = "10px"
        aiPanel.style.borderRadius = "4px"
        aiPanel.style.marginTop = "10px"
        aiPanel.style.display = "block"
      }
    }
  }, 2000)
}

// AI Auto-Fill Simulation
function simulateAIAutoFill() {
  // Show loading state
  const autoFillBtn = document.querySelector('.btn-primary[data-action="auto-fill"]')
  if (autoFillBtn) {
    autoFillBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
    autoFillBtn.disabled = true
  }

  // This would be connected to the AI backend in a real implementation
  // For demo purposes, we'll just fill in some sample data after a short delay
  setTimeout(() => {
    const employerName = document.getElementById("employer-name")
    const employerId = document.getElementById("employer-id")
    const groupNumber = document.getElementById("group-number")
    const effectiveDate = document.getElementById("effective-date")
    const employerAddress = document.getElementById("employer-address")
    const employerCity = document.getElementById("employer-city")
    const employerState = document.getElementById("employer-state")
    const employerZip = document.getElementById("employer-zip")
    const contactName = document.getElementById("contact-name")
    const contactPhone = document.getElementById("contact-phone")
    const contactEmail = document.getElementById("contact-email")
    const taxId = document.getElementById("tax-id")
    const sicCode = document.getElementById("sic-code")
    const companyType = document.getElementById("company-type")

    if (employerName) employerName.value = "Acme Corporation"
    if (employerId) employerId.value = "EMP-2025-0042"
    if (groupNumber) groupNumber.value = "GRP-10042-A"
    if (effectiveDate) effectiveDate.value = "2025-06-01"
    if (employerAddress) employerAddress.value = "123 Business Ave, Suite 500"
    if (employerCity) employerCity.value = "San Francisco"
    if (employerState) employerState.value = "CA"
    if (employerZip) employerZip.value = "94105"
    if (contactName) contactName.value = "Jane Smith"
    if (contactPhone) contactPhone.value = "(415) 555-1234"
    if (contactEmail) contactEmail.value = "jsmith@acmecorp.com"
    if (taxId) taxId.value = "12-3456789"
    if (sicCode) sicCode.value = "7371"
    if (companyType) companyType.value = "corporation"

    // Reset button state
    if (autoFillBtn) {
      autoFillBtn.innerHTML = '<i class="fas fa-magic"></i> AI Auto-Fill'
      autoFillBtn.disabled = false
    }

    // Show success message
    const aiPanel = document.querySelector(".ai-feedback")
    if (aiPanel) {
      aiPanel.innerHTML =
        '<p><i class="fas fa-check-circle"></i> Form auto-filled successfully! Please review the information before proceeding.</p>'
      aiPanel.style.color = "var(--success-color)"
      aiPanel.style.backgroundColor = "rgba(40, 167, 69, 0.1)"
      aiPanel.style.padding = "10px"
      aiPanel.style.borderRadius = "4px"
      aiPanel.style.marginTop = "10px"
      aiPanel.style.display = "block"
    }
  }, 1500)
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Initialize theme and font size selectors
document.addEventListener("DOMContentLoaded", () => {
  // Theme selector
  const themeToggle = document.getElementById("theme-toggle")
  const themeDropdown = document.querySelector(".theme-dropdown")

  if (themeToggle && themeDropdown) {
    themeToggle.addEventListener("click", () => {
      themeDropdown.classList.toggle("show")
    })

    document.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.getAttribute("data-theme")
        document.documentElement.setAttribute("data-theme", theme)
        themeDropdown.classList.remove("show")
      })
    })
  }

  // Font size selector
  const fontSizeToggle = document.getElementById("font-size-toggle")
  const fontSizeDropdown = document.querySelector(".font-size-dropdown")

  if (fontSizeToggle && fontSizeDropdown) {
    fontSizeToggle.addEventListener("click", () => {
      fontSizeDropdown.classList.toggle("show")
    })

    document.querySelectorAll(".font-size-option").forEach((option) => {
      option.addEventListener("click", () => {
        const size = option.getAttribute("data-size")
        document.documentElement.setAttribute("data-font-size", size)
        fontSizeDropdown.classList.remove("show")
      })
    })
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-selector") && themeDropdown) {
      themeDropdown.classList.remove("show")
    }

    if (!event.target.closest(".font-size-selector") && fontSizeDropdown) {
      fontSizeDropdown.classList.remove("show")
    }
  })

  // AI Auto-Fill button
  const autoFillBtn = document.querySelector('.btn-primary[data-action="auto-fill"]')
  if (autoFillBtn) {
    autoFillBtn.addEventListener("click", simulateAIAutoFill)
  }

  // Document upload
  const uploadInput = document.querySelector('input[type="file"][data-action="upload-document"]')
  if (uploadInput) {
    uploadInput.addEventListener("change", handleDocumentUpload)
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn")
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get all filter buttons in the same group
        const filterGroup = button.closest(".filter-options")
        const groupButtons = filterGroup.querySelectorAll(".filter-btn")

        // Remove active class from all buttons in the group
        groupButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")
      })
    })
  }

  // Category tabs
  const categoryTabs = document.querySelectorAll(".category-tabs .tab-btn")
  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")
      })
    })
  }
})
