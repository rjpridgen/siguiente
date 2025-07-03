terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 5.6.0"
    }
    http = {
      source = "hashicorp/http"
      version = "~> 3.4.2"
    }
  }
}

data "http" "github" {
  url = "https://api.github.com/meta"
}

data "cloudflare_account" "siguiente" {
  filter = {
    name = "Siguiente"
  }
}

locals {
  git = jsondecode(data.http.github.response_body)["git"]
}

resource "cloudflare_zero_trust_list" "github_git_cidr" {
  account_id = data.cloudflare_account.siguiente.account_id
  name = "Github Git IP"
  description = ""
  type = "IP"
  items = [ for ip in local.git : { value = ip } ]
}
