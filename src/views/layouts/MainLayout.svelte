<script lang="ts">
  import { uiStore } from '../../stores/uiStore';

  let currentPage = 'dashboard';
  let sidebarOpen = true;

  uiStore.subscribe(state => {
    currentPage = state.currentPage;
    sidebarOpen = state.sidebarOpen;
  });

  function handleNavigation(page: string) {
    uiStore.setCurrentPage(page);
  }

  function toggleSidebar() {
    uiStore.toggleSidebar();
  }
</script>

<div class="main-layout">
  <aside class="sidebar" class:closed={!sidebarOpen}>
    <div class="sidebar-header">
      <h2>📚 Library</h2>
      <button 
        class="toggle-button"
        on:click={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <button 
        class="nav-item"
        class:active={currentPage === 'dashboard'}
        on:click={() => handleNavigation('dashboard')}
      >
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentPage === 'books'}
        on:click={() => handleNavigation('books')}
      >
        <span class="nav-icon">📚</span>
        <span class="nav-text">Books</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentPage === 'members'}
        on:click={() => handleNavigation('members')}
      >
        <span class="nav-icon">👥</span>
        <span class="nav-text">Members</span>
      </button>
      
      <button 
        class="nav-item"
        class:active={currentPage === 'loans'}
        on:click={() => handleNavigation('loans')}
      >
        <span class="nav-icon">📋</span>
        <span class="nav-text">Loans</span>
      </button>
    </nav>
  </aside>
  
  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  .main-layout {
    display: flex;
    min-height: 100vh;
    background: #f3f4f6;
  }
  
  .sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    flex-shrink: 0;
  }
  
  .sidebar.closed {
    width: 60px;
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .sidebar-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #1f2937;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .sidebar.closed .sidebar-header h2 {
    display: none;
  }
  
  .toggle-button {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .toggle-button:hover {
    background: #f3f4f6;
  }
  
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    flex: 1;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 6px;
    margin: 0 0.5rem;
  }
  
  .nav-item:hover {
    background: #f3f4f6;
  }
  
  .nav-item.active {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .sidebar.closed .nav-text {
    display: none;
  }
  
  .sidebar.closed .nav-item {
    justify-content: center;
    padding: 1rem;
  }
  
  .nav-icon {
    font-size: 1.25rem;
  }
  
  .nav-text {
    font-weight: 500;
    color: #374151;
  }
  
  .main-content {
    flex: 1;
    overflow: auto;
  }
</style>
