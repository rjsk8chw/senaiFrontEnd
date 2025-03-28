-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FindWork
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FindWork
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FindWork` DEFAULT CHARACTER SET utf8 ;
USE `FindWork` ;

-- -----------------------------------------------------
-- Table `FindWork`.`Candidato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FindWork`.`Candidato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `data_nascimento` DATETIME NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefone` VARCHAR(10) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `escolaridade` VARCHAR(60) NOT NULL,
  `area_interesse` VARCHAR(150) NOT NULL,
  `experiencia` TEXT NULL,
  `curriculo` VARCHAR(150) NULL,
  `cursos` TEXT NULL,
  `senha` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FindWork`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FindWork`.`Empresa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(150) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `qtd_funcionario` TINYINT NULL,
  `telefone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `site` VARCHAR(150) NULL,
  `rede_social` VARCHAR(150) NULL,
  `senha` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FindWork`.`Vaga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FindWork`.`Vaga` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `requisitos` TEXT NOT NULL,
  `salario` DECIMAL(12,2) NULL,
  `localizacao` VARCHAR(150) NOT NULL,
  `tipo_contratacao` VARCHAR(60) NOT NULL,
  `beneficios` TEXT NULL,
  `data_limite` DATETIME NOT NULL,
  `qtd_vaga` TINYINT NOT NULL,
  `jornada_trabalho` VARCHAR(150) NOT NULL,
  `empresa_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Vaga_Empresa_idx` (`empresa_id` ASC) VISIBLE,
  CONSTRAINT `fk_Vaga_Empresa`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `FindWork`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FindWork`.`Candidatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FindWork`.`Candidatura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `soube_vaga` VARCHAR(60) NOT NULL,
  `experiencia` CHAR(1) NOT NULL,
  `data_candidatura` DATETIME NOT NULL,
  `vaga_id` INT NOT NULL,
  `candidato_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Candidatura_Candidato1_idx` (`candidato_id` ASC) VISIBLE,
  INDEX `fk_Candidatura_Vaga1_idx` (`vaga_id` ASC) VISIBLE,
  CONSTRAINT `fk_Candidatura_Candidato1`
    FOREIGN KEY (`candidato_id`)
    REFERENCES `FindWork`.`Candidato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Candidatura_Vaga1`
    FOREIGN KEY (`vaga_id`)
    REFERENCES `FindWork`.`Vaga` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
