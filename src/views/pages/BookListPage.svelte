<script lang="ts">
  import { onMount } from 'svelte';
  import { bookController } from '../../controllers/BookController';
  import { bookStore, isLoading, hasError } from '../../stores/bookStore';
  import BookCard from '../components/BookCard.svelte';
  import SearchBar from '../components/SearchBar.svelte';

  let searchQuery = '';
  let selectedGenre = '';
  const genres = ['All', 'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Mystery', 'Romance', 'Other'];

  onMount(() => {
    bookController.loadBooks();
  });

  function handleSearch(query: string) {
    searchQuery = query;
    if (query.trim()) {
      bookController.searchBooks(query);
    } else {
      bookController.loadBooks();
    }
  }

  function handleGenreChange(genre: string) {
    selectedGenre = genre;
    bookController.setFilter('genre', genre === 'All' ? undefined : genre);
    bookController.loadBooks();
  }

  function handleBookSelect(event: CustomEvent) {
    const { book } = event.detail;
    bookController.selectBook(book);
  }

  function handleNextPage() {
    const currentPage = getCurrentPage();
    bookController.setPage(currentPage + 1);
  }

  function handlePrevPage() {
    const currentPage = getCurrentPage();
    if (currentPage > 1) {
      bookController.setPage(currentPage - 1);
    }
  }

  function getCurrentPage(): number {
    let page = 1;
    bookStore.subscribe(state => {
      page = state.pagination.page;
    })();
    return page;
  }

  function getTotalPages(): number {
    let total = 0;
    let pageSize = 20;
    bookStore.subscribe(state => {
      total = state.pagination.total;
      pageSize = state.pagination.pageSize;
    })();
    return Math.ceil(total / pageSize);
  }
</script>

<div class="book-list-page">
  <header>
    <h1>Library Books</h1>
    <SearchBar 
      value={searchQuery}
      placeholder="Search by title or author..."
      onSearch={handleSearch}
    />
  </header>
  
  <div class="filters">
    <label for="genre-select">Genre:</label>
    <select 
      id="genre-select"
      bind:value={selectedGenre} 
      on:change={() => handleGenreChange(selectedGenre)}
    >
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
  </div>
  
  {#if $isLoading}
    <div class="loading">Loading books...</div>
  {:else if $hasError}
    <div class="error">Failed to load books</div>
  {:else}
    <div class="books-container">
      {#each $bookStore.books as book (book.id)}
        <BookCard 
          {book} 
          on:select={handleBookSelect}
        />
      {/each}
    </div>
    
    {#if $bookStore.books.length === 0}
      <div class="empty">No books found</div>
    {/if}
  {/if}
  
  <div class="pagination">
    <button 
      class="pagination-button"
      disabled={getCurrentPage() === 1}
      on:click={handlePrevPage}
    >
      Previous
    </button>
    <span class="page-info">
      Page {getCurrentPage()} of {getTotalPages()}
    </span>
    <button 
      class="pagination-button"
      disabled={getCurrentPage() >= getTotalPages()}
      on:click={handleNextPage}
    >
      Next
    </button>
  </div>
</div>

<style>
  .book-list-page {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  h1 {
    margin: 0;
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
  }
  
  .filters {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  label {
    font-weight: 600;
    color: #374151;
  }
  
  select {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
  }
  
  .books-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .loading, .error, .empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
    font-size: 1.1rem;
    border-radius: 8px;
    background: #f9fafb;
  }
  
  .error {
    color: #dc2626;
    background: #fef2f2;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .pagination-button {
    padding: 0.5rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background: #2563eb;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-info {
    color: #6b7280;
    font-weight: 500;
  }
</style>
