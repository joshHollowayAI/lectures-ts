#!/usr/bin/env bash
# Manage one-branch-per-video work inside a lectures/<lang> repo.
#
#   npm run lesson start <slug>   branch video-<n+1>--<slug> off the current video branch
#   npm run lesson reset          throw away everything since the lesson started, stay on the branch
#   npm run lesson scrap          delete the lesson branch and go back to where it started
#   npm run lesson status         show the lesson's starting point and what has changed since
#
# The starting commit is saved in git config (branch.<name>.lessonBase), so
# reset and scrap always know exactly where the lesson began.
set -euo pipefail

die() { echo "lesson: $*" >&2; exit 1; }

confirm() {
  read -r -p "$1 [y/N] " ans
  [[ "$ans" == [yY] ]] || die "cancelled"
}

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "not inside a git repo (cd into lectures/<lang> first)"

branch=$(git branch --show-current)
base=$(git config --get "branch.$branch.lessonBase" || true)
base_branch=$(git config --get "branch.$branch.lessonBaseBranch" || true)

case "${1:-}" in
  start)
    slug="${2:-}"
    [[ -n "$slug" ]] || die "usage: npm run lesson start <slug>   (e.g. npm run lesson start node-basics)"
    [[ -z "$(git status --porcelain)" ]] || die "working tree has changes; commit or reset them first"
    [[ "$branch" =~ ^video-([0-9]+)-- ]] || die "current branch '$branch' isn't a video-<n>--<slug> branch"
    n=$(( BASH_REMATCH[1] + 1 ))
    new="video-$n--$slug"
    git switch -c "$new"
    git config "branch.$new.lessonBase" "$(git rev-parse HEAD)"
    git config "branch.$new.lessonBaseBranch" "$branch"
    echo "Started $new (from $branch @ $(git rev-parse --short HEAD))"
    ;;

  reset)
    [[ -n "$base" ]] || die "'$branch' wasn't created with 'npm run lesson start', so there's no saved starting point"
    echo "This discards ALL commits and uncommitted changes on $branch since $(git rev-parse --short "$base")."
    git status --short
    confirm "Reset $branch to its starting point?"
    git reset --hard "$base"
    git clean -fd
    echo "Back to the start of $branch."
    ;;

  scrap)
    [[ -n "$base" ]] || die "'$branch' wasn't created with 'npm run lesson start', so there's no saved starting point"
    confirm "Delete $branch and everything on it, then go back to $base_branch?"
    git reset --hard
    git clean -fd
    git switch "$base_branch"
    git branch -D "$branch"
    if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
      echo "Note: $branch was pushed. Delete it on GitHub with: git push origin --delete $branch"
    fi
    echo "Scrapped. You're on $base_branch."
    ;;

  status)
    [[ -n "$base" ]] || die "'$branch' wasn't created with 'npm run lesson start'"
    echo "$branch started from $base_branch @ $(git rev-parse --short "$base")"
    echo
    git log --oneline "$base..HEAD"
    git diff --stat "$base"
    git status --short
    ;;

  *)
    sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'
    exit 0
    ;;
esac
