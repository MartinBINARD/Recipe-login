import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
// on ajoute des méthodes pour le `expect`
expect.extend(matchers);
