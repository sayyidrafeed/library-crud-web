<script lang="ts">
  import { uiStore } from './stores/uiStore';
  import MainLayout from './views/layouts/MainLayout.svelte';
  import DashboardPage from './views/pages/DashboardPage.svelte';
  import BookListPage from './views/pages/BookListPage.svelte';

  let currentPage = 'dashboard';
  let errorMessage = '';
  let successMessage = '';

  uiStore.subscribe(state => {
    currentPage = state.currentPage;
    errorMessage = state.error || '';
    successMessage = state.success || '';
  });

  function clearMessages() {
    uiStore.clearMessages();
  }
</script>

<svelte:head>
  <title>Library Management System</title>
  <meta name="description" content="A modern library management system built with Svelte 5" />
</svelte:head>

{#if errorMessage || successMessage}
  <div class="notification" class:error={!!errorMessage} class:success={!!successMessage}>
    <span class="notification-icon">
      {errorMessage ? '⚠' : '✓'}
    </span>
    <span class="notification-text">
      {errorMessage || successMessage}
    </span>
    <button 
      class="notification-close"
      on:click={clearMessages}
      aria-label="Close notification"
    >
      ✕
    </button>
  </div>
{/if}

<MainLayout>
  {#if currentPage === 'dashboard'}
    <DashboardPage />
  {:else if currentPage === 'books'}
    <BookListPage />
  {:else if currentPage === 'members'}
    <div class="placeholder">
      <h2>Members Page</h2>
      <p>Member management coming soon...</p>
    </div>
  {:else if currentPage === 'loans'}
    <div class="placeholder">
      <h2>Loans Page</h2>
      <p>Loan management coming soon...</p>
    </div>
  {/if}
</MainLayout>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .notification {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 400px;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notification.error {
    background: #fef2f2;
    border-left: 4px solid #dc2626;
    color: #991b1b;
  }

  .notification.success {
    background: #f0fdf4;
    border-left: 4px solid #059669;
    color: #064e3b;
  }

  .notification-icon {
    font-size: 1.5rem;
  }

  .notification-text {
    flex: 1;
    font-weight: 500;
  }

  .notification-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .notification-close:hover {
    opacity: 1;
  }

  .placeholder {
    padding: 4rem 2rem;
    text-align: center;
    color: #6b7280;
  }

  .placeholder h2 {
    margin: 0 0 1rem 0;
    color: #1f2937;
  }

  .placeholder p {
    margin: 0;
  }
</style>
