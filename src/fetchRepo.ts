export class fetchRepo {
  private user: string;
  private forks: boolean;
  private includes: string[];
  private excludes: string[];
  private token?: string;

  constructor({ user, forks, includes, excludes, token }: { user: string; forks: boolean; includes: string[]; excludes: string[]; token?: string }) {
    this.user = user;
    this.forks = forks;
    this.includes = includes;
    this.excludes = excludes;
    this.token = token;
  }

  private async fetch() {
    const headers: HeadersInit = this.token ? { Authorization: `token ${this.token}` } : {};
    const response = await fetch(`https://api.github.com/users/${this.user}/repos?per_page=120`, { headers });
    let repos = await response.json();
    repos = this.forks ? repos : repos.filter((repo: { fork: boolean }) => !repo.fork);
    repos = repos.filter((repo: { id: number }) => !this.excludes.includes(repo.id.toString()));
    return repos.map((repo: Record<string, unknown>) => {
      const filteredRepo: Record<string, unknown> = {};
      this.includes.forEach((key) => {
        if (repo[key] !== undefined) {
          filteredRepo[key] = repo[key];
        }
      });
      return filteredRepo;
    });
  }

  public async build(): Promise<string> {
    const repos = await this.fetch();
    return JSON.stringify(repos, null, 2);
  }
}
