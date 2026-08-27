/**
 * Balkan Dergâhı reminder: light analog-travel editorial surface, paper texture,
 * asymmetrical composition, serif masthead, teal route accents, gentle tactile motion.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import KasaPage from "./pages/KasaPage";
import ValizPage from "./pages/ValizPage";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/kasa" component={KasaPage} />
        <Route path="/butce" component={KasaPage} />
        <Route path="/harcama" component={KasaPage} />
        <Route path="/splitwise" component={KasaPage} />
        <Route path="/valiz" component={ValizPage} />
        <Route path="/bagaj" component={ValizPage} />
        <Route path="/teftis" component={ValizPage} />
        <Route path="/checklist" component={ValizPage} />
        <Route path="/rehber" component={Home} />
        <Route path="/plan" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={Home} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
