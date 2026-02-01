"use client";
import { useEffect, useState } from "react";


const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto"
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "40px"
  },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400"
  },
  inputSection: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    marginBottom: "30px"
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "stretch"
  },
  input: {
    flex: "1",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "2px solid #020918",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    fontWeight: "500",
    color:" #020918"
  },
  addButton: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    whiteSpace: "nowrap" as const
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  gameCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    position: "relative" as const,
    overflow: "hidden",
    border: "4px solid #020918",
  },
  gameCardInner: {
    position: "relative" as const,
    zIndex: 1
  },
  gameIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "16px"
  },
  gameName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "16px",
    wordBreak: "break-word" as const
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  editButton: {
    flex: "1",
    padding: "10px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },
  deleteButton: {
    flex: "1",
    padding: "10px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5
  },
  emptyText: {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "500"
  },
  badge: {
    position: "absolute" as const,
    top: "16px",
    right: "16px",
    backgroundColor: "#fbbf24",
    color: "#78350f",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase" as const
  }
};

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  
  const fetchGames = async () => {
    const res = await fetch("http://localhost:5000/games");
    const data = await res.json();
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  
  const addOrUpdateGame = async () => {
    if (!name.trim()) return;
    
    if (editId) {
      await fetch(`http://localhost:5000/games/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      setEditId(null);
    } else {
      await fetch("http://localhost:5000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
    }
    setName("");
    fetchGames();
  };

  
  const deleteGame = async (id: number) => {
    await fetch(`http://localhost:5000/games/${id}`, {
      method: "DELETE"
    });
    fetchGames();
  };

  
  const editGame = (game: any) => {
    setName(game.name);
    setEditId(game.id);
  };

  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOrUpdateGame();
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🎮 Game Dashboard</h1>
          <p style={styles.subtitle}>Manage your favorite games collection</p>
        </div>

        {/* Input Section */}
        <div style={styles.inputSection}>
          <div style={styles.inputWrapper}>
            <input
              style={{
                ...styles.input,
                borderColor: name ? "#667eea" : "#e5e7eb"
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter game name..."
            />
            <button
              style={{
                ...styles.addButton,
                transform: name ? "scale(1)" : "scale(0.98)",
                opacity: name ? "1" : "0.7"
              }}
              onClick={addOrUpdateGame}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
              }}
            >
              {editId ? "✓ Update" : "+ Add Game"}
            </button>
          </div>
        </div>

        
        {games.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎯</div>
            <p style={styles.emptyText}>No games yet. Add your first game above!</p>
          </div>
        ) : (
          <div style={styles.gamesGrid}>
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  ...styles.gameCard,
                  transform: hoveredCard === game.id ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: hoveredCard === game.id 
                    ? "0 12px 30px rgba(0, 0, 0, 0.15)" 
                    : "0 4px 20px rgba(0, 0, 0, 0.1)"
                }}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {editId === game.id && (
                  <div style={styles.badge}>Editing</div>
                )}
                <div style={styles.gameCardInner}>
                  <div style={styles.gameIcon}>🎮</div>
                  <h3 style={styles.gameName}>{game.name}</h3>
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.editButton}
                      onClick={() => editGame(game)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteGame(game.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ef4444";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
